package com.lumiad.smartlocker.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Id;

@Builder
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class User {
  @Id private String id;

  @JsonIgnore private String password;

  @NotEmpty(message = "Het 'email' veld is verplicht")
  @Email(message = "Geen geldig email adres")
  private String email;

  @NotEmpty(message = "Het 'voornaam' veld is verplicht")
  private String firstName;

  @NotEmpty(message = "Het 'achternaam' veld is verplicht")
  private String lastName;

  @NotEmpty(message = "Het 'gebruikers groep' veld is verplicht")
  private String groupId;

  private String accessToken;
}
