package com.lumiad.smartlocker.serviceadapters;

import com.lumiad.smartlocker.dto.ScheduleDTO;
import com.lumiad.smartlocker.models.Schedule;
import com.lumiad.smartlocker.models.User;
import com.lumiad.smartlocker.repositoryports.ScheduleRepositoryPort;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import com.lumiad.smartlocker.serviceports.ScheduleServicePort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

public class ScheduleServiceAdapter implements ScheduleServicePort {

  private ScheduleRepositoryPort scheduleRepository;

  @Autowired private UserServiceAdapter userService;

  public ScheduleServiceAdapter(ScheduleRepositoryPort scheduleRepository) {
    this.scheduleRepository = scheduleRepository;
  }

  @Override
  public String addSchedule(Schedule schedule) {
    return scheduleRepository.addSchedule(schedule);
  }

  @Override
  public void updateSchedule(Schedule schedule) {
    scheduleRepository.updateSchedule(schedule);
  }

  @Override
  public void deleteSchedule(String id) {
    scheduleRepository.deleteSchedule(id);
  }

  @Override
  public Schedule getSchedule(String id) throws NotFoundException {
    Schedule schedule = scheduleRepository.getSchedule(id);

    if (schedule == null) {
      throw new NotFoundException("Schedule with id: " + id + " does not exist.");
    }

    return schedule;
  }

  @Override
  public boolean canUserEnter(String accessToken, String smartLockerId) {
    User user = userService.getUserByAccessToken(accessToken);

    if (user == null) return false;

    List<Schedule> activeSchedules =
        scheduleRepository.getCurrentActiveSchedulesByUserAndSmarterLockerId(
            user.getId(), smartLockerId);
    return (!activeSchedules.isEmpty());
  }

  @Override
  public Page<Schedule> getSchedulesByUserId(String userId, Pageable pageable) {
    return scheduleRepository.getSchedulesByUserId(userId, pageable);
  }

  @Override
  public List<ScheduleDTO> getSchedulesByUserIdAndWeek(String userId, int year, int week)
      throws NotFoundException {
    LocalDate startDate =
        LocalDate.parse(year + "-W" + week + "-1", DateTimeFormatter.ISO_WEEK_DATE);

    return scheduleRepository.getSchedulesByUserIdAndBetweenDates(
        userId,
        Date.from(startDate.atStartOfDay(ZoneId.systemDefault()).toInstant()),
        Date.from(startDate.plusDays(7).atStartOfDay(ZoneId.systemDefault()).toInstant()));
  }
}
