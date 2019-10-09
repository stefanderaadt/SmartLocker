package com.lumiad.smartlocker.repositoryports;

import com.lumiad.smartlocker.dto.ScheduleDTO;
import com.lumiad.smartlocker.models.Schedule;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

public interface ScheduleRepositoryPort {

  String addSchedule(Schedule schedule);

  void updateSchedule(Schedule schedule);

  void deleteSchedule(String id);

  Schedule getSchedule(String id);

  Page<Schedule> getSchedulesByUserId(String userId, Pageable pageable);

  List<Schedule> getCurrentActiveSchedulesByUserAndSmarterLockerId(
      String userId, String smartlockerId);

  List<ScheduleDTO> getSchedulesByUserIdAndBetweenDates(String userId, Date startDate, Date endDate)
      throws NotFoundException;
}
