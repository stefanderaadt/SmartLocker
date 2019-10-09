package com.lumiad.smartlocker.authentication;

import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@EqualsAndHashCode
public class CustomUserDetails extends org.springframework.security.core.userdetails.User {

  public CustomUserDetails(
      String username,
      String password,
      String firstName,
      String lastName,
      Collection<? extends GrantedAuthority> authorities) {
    super(username, password, authorities);

    this.firstName = firstName;
    this.lastName = lastName;
  }

  public CustomUserDetails(
      String username, String password, Collection<? extends GrantedAuthority> authorities) {
    super(username, password, authorities);
  }

  private String firstName;
  private String lastName;

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }
}
