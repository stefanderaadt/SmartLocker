package com.lumiad.smartlocker.authentication;

import com.lumiad.smartlocker.helpers.Logger;
import com.lumiad.smartlocker.models.Group;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import com.lumiad.smartlocker.serviceports.GroupServicePort;
import com.lumiad.smartlocker.serviceports.UserServicePort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lumiad.smartlocker.models.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  private UserServicePort userService;
  private GroupServicePort groupService;
  private Logger logger;

  @Autowired
  public UserDetailsServiceImpl(
      UserServicePort userService, GroupServicePort groupService, Logger logger) {
    this.userService = userService;
    this.groupService = groupService;
    this.logger = logger;
  }

  @Override
  public UserDetails loadUserByUsername(String email) {
    User applicationUser;
    Group applicationUserGroup;

    try {
      applicationUser = userService.findUserByEmail(email);
      applicationUserGroup = groupService.getGroup(applicationUser.getGroupId());
    } catch (NotFoundException e) {
      String message = String.format("User with email: %s not found", email);
      logger.warn(message);
      throw new UsernameNotFoundException(message);
    }

    return new CustomUserDetails(
        applicationUser.getEmail(),
        applicationUser.getPassword(),
        applicationUser.getFirstName(),
        applicationUser.getLastName(),
        applicationUserGroup.getGrantedAuthorities());
  }
}
