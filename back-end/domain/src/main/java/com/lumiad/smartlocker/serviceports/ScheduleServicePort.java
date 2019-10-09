package com.lumiad.smartlocker.serviceports;

import com.lumiad.smartlocker.dto.ScheduleDTO;
import com.lumiad.smartlocker.models.Schedule;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ScheduleServicePort {

  String addSchedule(Schedule schedule);

  void updateSchedule(Schedule schedule);

  void deleteSchedule(String id);

  Schedule getSchedule(String id) throws NotFoundException;

  Page<Schedule> getSchedulesByUserId(String userId, Pageable pageable);

  boolean canUserEnter(String accessToken, String smartLockerId);

  List<ScheduleDTO> getSchedulesByUserIdAndWeek(String userId, int year, int week)
      throws NotFoundException;
}
