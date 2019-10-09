package com.lumiad.smartlocker.controllers;

import com.lumiad.smartlocker.models.*;
import com.lumiad.smartlocker.serviceports.GroupServicePort;
import com.lumiad.smartlocker.serviceports.ScheduleServicePort;
import com.lumiad.smartlocker.serviceports.SmartLockerServicePort;
import com.lumiad.smartlocker.serviceports.UserServicePort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@RestController
public class TestController {
  @Autowired UserServicePort userService;

  @Autowired GroupServicePort groupService;

  @Autowired ScheduleServicePort scheduleService;

  @Autowired SmartLockerServicePort smartLockerService;

  @Autowired BCryptPasswordEncoder bCryptPasswordEncoder;

  @GetMapping("/init")
  @ResponseBody
  public String test() {
    List<SimpleGrantedAuthority> grantedAuthorities = new ArrayList<>();
    grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
    Group group = new Group("ADMIN", true, grantedAuthorities);
    groupService.addGroup(group);

    List<SimpleGrantedAuthority> grantedAuthorities2 = new ArrayList<>();
    grantedAuthorities2.add(new SimpleGrantedAuthority("ROLE_CAREGIVER"));
    Group group2 = new Group("CAREGIVER", true, grantedAuthorities);
    groupService.addGroup(group2);

    User user = new User();
    user.setEmail("stefanderaadt@gmail.com");
    user.setPassword(bCryptPasswordEncoder.encode("qwerty"));
    user.setFirstName("Stefan");
    user.setLastName("de Raadt");
    user.setGroupId("GROUP::ADMIN");
    userService.addUser(user);

    User caregiver = new User();
    caregiver.setEmail("verzorger@gmail.com");
    caregiver.setFirstName("Verzorger");
    caregiver.setLastName("achternaam van Verzorger");
    caregiver.setGroupId("GROUP::CAREGIVER");
    userService.addUser(caregiver);

    Address address = new Address("Newtonlaan", "133", "Utrecht", "3564AZ");
    Patient patient = new Patient("Sam", "Morssinkhof");

    SmartLocker smartLocker = new SmartLocker();
    smartLocker.setAddress(address);
    smartLocker.setPatient(patient);
    String smartLockerId = smartLockerService.addSmartLocker(smartLocker);

    Calendar fromDate = Calendar.getInstance();
    Calendar toDate = Calendar.getInstance();

    fromDate.add(Calendar.MINUTE, -100);
    toDate.add(Calendar.MINUTE, 100);

    Schedule schedule = new Schedule();
    schedule.setDateFrom(fromDate.getTime());
    schedule.setDateTo(toDate.getTime());
    schedule.setUserId(caregiver.getId());
    schedule.setSmartLockerId(smartLockerId);
    scheduleService.addSchedule(schedule);

    return "Successfully initialized!";
  }
}
