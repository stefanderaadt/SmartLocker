package com.lumiad.smartlocker.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
  @Id private String id;

//  @NotEmpty(message = "Het 'datum van' veld is verplicht")
  private Date dateFrom;

//  @NotEmpty(message = "Het 'datum tot' veld is verplicht")
  private Date dateTo;

  @NotEmpty(message = "Het 'smartlocker id' veld is verplicht")
  private String smartLockerId;

  @NotEmpty(message = "Het 'gebruikers id' veld is verplicht")
  private String userId;
}
