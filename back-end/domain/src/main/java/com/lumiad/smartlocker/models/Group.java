package com.lumiad.smartlocker.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Group implements GrantedAuthority {
  @Id private String id;

  @NonNull private String name;

  @NonNull private boolean canLogin;

  private List<SimpleGrantedAuthority> grantedAuthorities;

  @Override
  public String getAuthority() {
    return id;
  }

  public Group(String name, boolean canLogin, List<SimpleGrantedAuthority> grantedAuthorities) {
    this.name = name;
    this.canLogin = canLogin;
    this.grantedAuthorities = grantedAuthorities;
  }
}
