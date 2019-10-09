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
public class Address {
  @NotBlank(message = "Het 'straat' veld is verplicht")
  private String street;

  @NotBlank(message = "Het 'straatnummer' veld is verplicht")
  private String streetNumber;

  @NotBlank(message = "Het 'plaats' veld is verplicht")
  private String city;

  @NotBlank(message = "Het 'postcode' veld is verplicht")
  private String postalCode;
}
