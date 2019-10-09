package com.lumiad.smartlocker.controllers;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lumiad.smartlocker.helpers.RequestToPageable;
import com.lumiad.smartlocker.models.SmartLocker;
import com.lumiad.smartlocker.models.SmartLog;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import com.lumiad.smartlocker.serviceports.SmartLockerServicePort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Secured("ROLE_ADMIN")
@RequestMapping("/smartlockers")
public class SmartLockersRestController {
  private SmartLockerServicePort smartLockerService;

  @Autowired
  public SmartLockersRestController(SmartLockerServicePort smartLockerService) {
    this.smartLockerService = smartLockerService;
  }

  @GetMapping
  public Page<SmartLocker> getSmartLockers(
      @RequestParam int page,
      @RequestParam int size,
      @RequestParam String sort,
      @RequestParam String sortDirection) {
    return smartLockerService.getSmartLockers(
        RequestToPageable.get(page, size, sort, sortDirection));
  }

  @GetMapping("/{smartLockerId}")
  public SmartLocker getSmartLocker(@PathVariable String smartLockerId) throws NotFoundException {
    return smartLockerService.getSmartLocker(smartLockerId);
  }

  @GetMapping("/search")
  public List<SmartLocker> searchSmartLockers() {
    return smartLockerService.findSmartLockersBySearchValue("");
  }

  @GetMapping("/search/{searchValue}")
  public List<SmartLocker> searchSmartLockers(@PathVariable String searchValue) {
    return smartLockerService.findSmartLockersBySearchValue(searchValue);
  }

  @PostMapping
  public String addSmartLocker(@Valid @RequestBody SmartLocker smartLocker) {
    String smartlockerId = smartLockerService.addSmartLocker(smartLocker);

    ObjectNode responseJSONObject = JsonNodeFactory.instance.objectNode();
    responseJSONObject.put("id", smartlockerId);
    return responseJSONObject.toString();
  }

  @PutMapping
  public void updateSmartLocker(@Valid @RequestBody SmartLocker smartLocker) {
    smartLockerService.updateSmartLocker(smartLocker);
  }

  @DeleteMapping("/{smartLockerId}")
  public void deleteSmartLocker(@PathVariable String smartLockerId) {
    smartLockerService.deleteSmartLocker(smartLockerId);
  }

  @PostMapping("/smartlog")
  public void addSmartLog(@Valid @RequestBody SmartLog smartLog) {
    smartLockerService.addSmartLog(smartLog);
  }
}
