package com.lumiad.smartlocker.controllers;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lumiad.smartlocker.dto.ScheduleDTO;
import com.lumiad.smartlocker.helpers.Logger;
import com.lumiad.smartlocker.models.Schedule;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import com.lumiad.smartlocker.serviceports.ScheduleServicePort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/schedules")
public class ScheduleRestController {
  private ScheduleServicePort scheduleService;

  @Autowired
  public ScheduleRestController(ScheduleServicePort scheduleService) {
    this.scheduleService = scheduleService;
  }

  @Autowired public Logger logger;

  @GetMapping("/get-by-userid")
  @Secured("ROLE_ADMIN")
  public Page<Schedule> getSchedulesByUserId(
      @RequestParam String userid,
      @RequestParam int page,
      @RequestParam int size,
      @RequestParam String sort,
      @RequestParam String sortDirection) {
    PageRequest pageRequest;

    if (sort != null && !sort.isEmpty()) {
      pageRequest =
          new PageRequest(
              page,
              size,
              new Sort(
                  sortDirection.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, sort));
    } else {
      pageRequest = new PageRequest(page, size);
    }
    return scheduleService.getSchedulesByUserId(userid, pageRequest);
  }

  @GetMapping("/get-by-week")
  @Secured("ROLE_ADMIN")
  public List<ScheduleDTO> getSchedulesByUserId(
      @RequestParam String userid, @RequestParam int year, @RequestParam int week)
      throws NotFoundException {
    return scheduleService.getSchedulesByUserIdAndWeek(userid, year, week);
  }

  @GetMapping("/{scheduleId}")
  @Secured("ROLE_ADMIN")
  public Schedule getSchedule(@PathVariable String scheduleId) throws NotFoundException {
    return scheduleService.getSchedule(scheduleId);
  }

  @PostMapping
  @Secured("ROLE_ADMIN")
  public String addSchedule(@Valid @RequestBody Schedule schedule) {
    String scheduleId = scheduleService.addSchedule(schedule);

    ObjectNode responseJSONObject = JsonNodeFactory.instance.objectNode();
    responseJSONObject.put("id", scheduleId);
    return responseJSONObject.toString();
  }

  @PutMapping
  @Secured("ROLE_ADMIN")
  public void updateSchedule(@Valid @RequestBody Schedule schedule) {
    scheduleService.updateSchedule(schedule);
  }

  @DeleteMapping("/{scheduleId}")
  @Secured("ROLE_ADMIN")
  public void deleteSchedule(@PathVariable String scheduleId) {
    scheduleService.deleteSchedule(scheduleId);
  }

  @GetMapping("/can-user-enter")
  public boolean canUserEnter(
      @RequestParam String accesstoken, @RequestParam String smartlockerid) {
    return scheduleService.canUserEnter(accesstoken, smartlockerid);
  }
}
