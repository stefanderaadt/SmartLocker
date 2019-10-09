package com.lumiad.smartlocker.dto;

import com.lumiad.smartlocker.models.SmartLocker;
import com.lumiad.smartlocker.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDTO {
  private String id;

  private Date dateFrom;

  private Date dateTo;

  private SmartLocker smartLocker;

  private User user;
}
