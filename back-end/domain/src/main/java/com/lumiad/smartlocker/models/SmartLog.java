package com.lumiad.smartlocker.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SmartLog {

  private String gps;

  private String batteryPercentage;

  private boolean isOpen;

  private Date createdAt;

  @Id
  private String id;

  @NotNull(message = "Patient is verplicht")
  private String smartLockerId;
}
