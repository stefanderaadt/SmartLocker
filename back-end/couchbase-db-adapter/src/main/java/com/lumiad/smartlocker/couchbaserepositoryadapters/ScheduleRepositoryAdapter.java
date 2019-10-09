package com.lumiad.smartlocker.couchbaserepositoryadapters;

import com.lumiad.smartlocker.couchbaserepositoryadapters.repositories.ScheduleRepository;
import com.lumiad.smartlocker.dto.ScheduleDTO;
import com.lumiad.smartlocker.helpers.TokenGenerator;
import com.lumiad.smartlocker.models.Schedule;
import com.lumiad.smartlocker.models.SmartLocker;
import com.lumiad.smartlocker.models.User;
import com.lumiad.smartlocker.repositoryports.ScheduleRepositoryPort;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import com.lumiad.smartlocker.serviceports.SmartLockerServicePort;
import com.lumiad.smartlocker.serviceports.UserServicePort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ScheduleRepositoryAdapter implements ScheduleRepositoryPort {

  @Autowired private ScheduleRepository scheduleRepository;
  @Autowired private UserServicePort userService;
  @Autowired private SmartLockerServicePort smartLockerService;

  @Override
  public String addSchedule(Schedule schedule) {
    schedule.setId(TokenGenerator.generateWithPrefix("SCHEDULE"));
    scheduleRepository.save(schedule);
    return schedule.getId();
  }

  @Override
  public void updateSchedule(Schedule schedule) {
    scheduleRepository.save(schedule);
  }

  @Override
  public void deleteSchedule(String id) {
    scheduleRepository.delete(id);
  }

  @Override
  public Schedule getSchedule(String id) {
    return scheduleRepository.findOne(id);
  }

  public Page<Schedule> getSchedulesByUserId(String userId, Pageable pageable) {
    return scheduleRepository.findByUserId(userId, pageable);
  }

  public List<Schedule> getCurrentActiveSchedulesByUserAndSmarterLockerId(
      String userId, String smartlockerId) {
    return scheduleRepository.getCurrentActiveSchedulesByUserAndSmarterLockerId(
        userId, smartlockerId, new Date().getTime());
  }

  @Override
  public List<ScheduleDTO> getSchedulesByUserIdAndBetweenDates(
      String userId, Date startDate, Date endDate) throws NotFoundException {
    List<Schedule> schedules =
        scheduleRepository.getUsersByUserIdAndInScheduleRange(
            userId, startDate.getTime(), endDate.getTime());

    List<ScheduleDTO> scheduleDTOS = new ArrayList<>();

    for (Schedule schedule : schedules) {
      User user = userService.getCaregiver(schedule.getUserId());
      SmartLocker smartLocker = smartLockerService.getSmartLocker(schedule.getSmartLockerId());
      ScheduleDTO scheduleDTO =
          ScheduleDTO.builder()
              .id(schedule.getId())
              .dateTo(schedule.getDateTo())
              .dateFrom(schedule.getDateFrom())
              .user(user)
              .smartLocker(smartLocker)
              .build();
      scheduleDTOS.add(scheduleDTO);
    }

    return scheduleDTOS;
  }
}
