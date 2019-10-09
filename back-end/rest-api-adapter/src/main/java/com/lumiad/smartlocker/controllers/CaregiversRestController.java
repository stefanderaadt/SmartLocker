package com.lumiad.smartlocker.controllers;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lumiad.smartlocker.helpers.RequestToPageable;
import com.lumiad.smartlocker.models.User;
import com.lumiad.smartlocker.serviceadapters.exceptions.FieldNotAllowedException;
import com.lumiad.smartlocker.serviceadapters.exceptions.InvalidGroupIdException;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import com.lumiad.smartlocker.serviceports.UserServicePort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Secured("ROLE_ADMIN")
@RequestMapping("/caregivers")
public class CaregiversRestController {
  private UserServicePort userService;

  @Autowired
  public CaregiversRestController(UserServicePort userService) {
    this.userService = userService;
  }

  @GetMapping
  public Page<User> getAllCaregivers(
      @RequestParam int page,
      @RequestParam int size,
      @RequestParam String sort,
      @RequestParam String sortDirection) {
    return userService.getCaregivers(RequestToPageable.get(page, size, sort, sortDirection));
  }

  @DeleteMapping("/{caregiverId}")
  public void deleteCaregiver(@PathVariable String caregiverId) {
    userService.deleteCaregiver(caregiverId);
  }

  @GetMapping("/{caregiverId}")
  public User getCaregiver(@PathVariable String caregiverId) throws NotFoundException {
    return userService.getCaregiver(caregiverId);
  }

  @PostMapping()
  public String addCaregiver(@Valid @RequestBody User newCaregiver)
      throws InvalidGroupIdException, FieldNotAllowedException {
    String caregiverId = userService.addCaregiver(newCaregiver);

    ObjectNode responseJSONObject = JsonNodeFactory.instance.objectNode();
    responseJSONObject.put("id", caregiverId);
    return responseJSONObject.toString();
  }

  @PutMapping()
  public void updateCaregiver(@Valid @RequestBody User updatedCaregiver)
      throws InvalidGroupIdException, FieldNotAllowedException {
    userService.updateCaregiver(updatedCaregiver);
  }
}
