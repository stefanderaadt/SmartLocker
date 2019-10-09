package com.lumiad.smartlocker.serviceadapters;

import com.lumiad.smartlocker.models.User;
import com.lumiad.smartlocker.repositoryports.UserRepositoryPort;
import com.lumiad.smartlocker.serviceadapters.exceptions.FieldNotAllowedException;
import com.lumiad.smartlocker.serviceadapters.exceptions.InvalidGroupIdException;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import com.lumiad.smartlocker.serviceports.UserServicePort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class UserServiceAdapter implements UserServicePort {
  private UserRepositoryPort userRepository;

  public UserServiceAdapter(UserRepositoryPort userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public User getCaregiver(String id) throws NotFoundException {
    User caregiver = userRepository.getUser(id);

    if (caregiver == null) {
      throw new NotFoundException("User with id: " + id + " does not exist.");
    }

    return caregiver;
  }

  @Override
  public User findUserByEmail(String email) throws NotFoundException {
    List<User> foundUsers = userRepository.findByEmail(email);

    if (foundUsers.isEmpty()) {
      throw new NotFoundException("User with email: " + email + " does not exist.");
    }

    return foundUsers.get(0);
  }

  @Override
  public String addUser(User user) {
    return userRepository.addUser(user);
  }

  @Override
  public void deleteCaregiver(String caregiverid) {
    userRepository.deleteUser(caregiverid);
  }

  @Override
  public Page<User> getCaregivers(Pageable pageable) {
    return userRepository.getCaregivers(pageable);
  }

  @Override
  public String addCaregiver(User caregiver)
      throws InvalidGroupIdException, FieldNotAllowedException {
    validateCaregiver(caregiver);

    return userRepository.addUser(caregiver);
  }

  @Override
  public void updateCaregiver(User caregiver)
      throws InvalidGroupIdException, FieldNotAllowedException {
    validateCaregiver(caregiver);

    userRepository.updateUser(caregiver);
  }

  private void validateCaregiver(User caregiver)
      throws InvalidGroupIdException, FieldNotAllowedException {
    if (!caregiver.getGroupId().equals("GROUP::CAREGIVER")) {
      throw new InvalidGroupIdException("Group id " + caregiver.getGroupId() + " is not valid.");
    }

    if (caregiver.getPassword() != null) {
      throw new FieldNotAllowedException("The field 'password' is not allowed for a caregiver.");
    }
  }

  @Override
  public User getUserByAccessToken(String accessToken) {
    return userRepository.getUserByAccessToken(accessToken);
  }
}
