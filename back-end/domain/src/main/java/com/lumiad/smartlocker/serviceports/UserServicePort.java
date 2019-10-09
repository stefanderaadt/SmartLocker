package com.lumiad.smartlocker.serviceports;

import com.lumiad.smartlocker.models.User;
import com.lumiad.smartlocker.serviceadapters.exceptions.FieldNotAllowedException;
import com.lumiad.smartlocker.serviceadapters.exceptions.InvalidGroupIdException;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserServicePort {
  String addCaregiver(User caregiver) throws InvalidGroupIdException, FieldNotAllowedException;

  void updateCaregiver(User caregiver) throws InvalidGroupIdException, FieldNotAllowedException;

  Page<User> getCaregivers(Pageable pageable);

  User getCaregiver(String id) throws NotFoundException;

  User findUserByEmail(String email) throws NotFoundException;

  String addUser(User user);

  void deleteCaregiver(String id);

  User getUserByAccessToken(String accessToken);
}
