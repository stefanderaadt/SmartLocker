package com.lumiad.smartlocker.controllers;

import com.lumiad.smartlocker.models.*;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;

import com.lumiad.smartlocker.serviceports.*;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
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

  @GetMapping("/test")
  @ResponseBody
  public void test() throws NotFoundException {
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

    System.out.println(scheduleService.canUserEnter(caregiver.getAccessToken(), smartLockerId));
  }

  @GetMapping("/test2")
  @ResponseBody
  public Group test2() throws NotFoundException, IOException {

    SmartLog smartLog = new SmartLog();
    smartLog.setSmartLockerId("SMARTLOCKER::1319f016-e4ef-449e-b59e-ac650656ccff");
    smartLog.setOpen(true);

    ObjectMapper objectMapper = new ObjectMapper();

    String logAsString = objectMapper.writeValueAsString(smartLog);
    System.out.println(logAsString);
    smartLockerService.addSmartLog(smartLog);

    System.out.println(smartLockerService.getLatestSmartLogBySmartLockerId("SMARTLOCKER::1319f016-e4ef-449e-b59e-ac650656ccff").getCreatedAt());


    return groupService.getGroup("GROUP::ADMIN");
  }


}
