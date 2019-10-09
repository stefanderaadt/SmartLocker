package com.lumiad.smartlocker.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
  @NotBlank(message = "Het 'voornaam' veld is verplicht")
  private String firstName;

  @NotBlank(message = "Het 'achternaam' veld is verplicht")
  private String lastName;
}
