package com.lumiad.smartlocker.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.Valid;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SmartLocker {
  @Id private String id;

  private List<SmartLog> smartLogs;

  @Valid private Patient patient;

  @Valid private Address address;
}
