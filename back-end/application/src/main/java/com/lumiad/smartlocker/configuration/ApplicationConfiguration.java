package com.lumiad.smartlocker.configuration;

import com.lumiad.smartlocker.couchbaserepositoryadapters.*;
import com.lumiad.smartlocker.helpers.Logger;
import com.lumiad.smartlocker.repositoryports.*;
import com.lumiad.smartlocker.serviceadapters.GroupServiceAdapter;
import com.lumiad.smartlocker.serviceadapters.ScheduleServiceAdapter;
import com.lumiad.smartlocker.serviceadapters.SmartLockerServiceAdapter;
import com.lumiad.smartlocker.serviceadapters.UserServiceAdapter;
import com.lumiad.smartlocker.serviceports.GroupServicePort;
import com.lumiad.smartlocker.serviceports.ScheduleServicePort;
import com.lumiad.smartlocker.serviceports.SmartLockerServicePort;
import com.lumiad.smartlocker.serviceports.UserServicePort;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class ApplicationConfiguration {
  // User beans
  @Bean
  public UserServicePort userServicePort(UserRepositoryPort userRepositoryPort) {
    return new UserServiceAdapter(userRepositoryPort);
  }

  @Bean
  public UserRepositoryPort userRepositoryPort() {
    return new UserRepositoryAdapter();
  }

  // Group beans
  @Bean
  public GroupServicePort groupServicePort(GroupRepositoryPort groupRepositoryPort) {
    return new GroupServiceAdapter(groupRepositoryPort);
  }

  @Bean
  public GroupRepositoryPort groupRepositoryPort() {
    return new GroupRepositoryAdapter();
  }

  // SmartLog bean
  @Bean
  public SmartLogRepositoryPort smartLogRepositoryPort() {
    return new SmartLogRepositoryAdapter();
  }

  // SmartLocker beans
  @Bean
  public SmartLockerServicePort smartLockerServicePort(
      SmartLockerRepositoryPort smartLockerRepositoryPort,
      SmartLogRepositoryPort smartLogRepositoryPort) {
    return new SmartLockerServiceAdapter(smartLockerRepositoryPort, smartLogRepositoryPort);
  }

  @Bean
  public SmartLockerRepositoryPort smartLockerRepositoryPort() {
    return new SmartLockerRepositoryAdapter();
  }

  // Schedule beans
  @Bean
  public ScheduleServicePort scheduleServicePort(ScheduleRepositoryPort scheduleRepositoryPort) {
    return new ScheduleServiceAdapter(scheduleRepositoryPort);
  }

  @Bean
  public ScheduleRepositoryPort scheduleRepositoryPort() {
    return new ScheduleRepositoryAdapter();
  }

  // Password encoder
  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // Logger
  @Bean
  public Logger logger() {
    return new Logger();
  }
}
