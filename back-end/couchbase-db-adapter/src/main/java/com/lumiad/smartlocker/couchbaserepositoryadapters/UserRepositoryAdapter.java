package com.lumiad.smartlocker.couchbaserepositoryadapters;

import com.google.common.collect.Lists;
import com.lumiad.smartlocker.couchbaserepositoryadapters.repositories.UserRepository;
import com.lumiad.smartlocker.helpers.TokenGenerator;
import com.lumiad.smartlocker.models.User;
import com.lumiad.smartlocker.repositoryports.UserRepositoryPort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class UserRepositoryAdapter implements UserRepositoryPort {
  @Autowired private UserRepository userRepository;

  @Override
  public String addUser(User user) {
    user.setId(TokenGenerator.generateWithPrefix("USER"));
    user.setAccessToken(TokenGenerator.generateRandomString(50));
    userRepository.save(user);
    return user.getId();
  }

  @Override
  public void updateUser(User user) {
    userRepository.save(user);
  }

  @Override
  public List<User> getUsers() {
    return Lists.newArrayList(userRepository.findAll());
  }

  @Override
  public Page<User> getCaregivers(Pageable pageable) {
    return userRepository.findByGroupId("GROUP::CAREGIVER", pageable);
  }

  @Override
  public void deleteUser(String id) {
    userRepository.delete(id);
  }

  @Override
  public User getUser(String userId) {
    return userRepository.findOne(userId);
  }

  @Override
  public List<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  @Override
  public User getUserByAccessToken(String accessToken) {
    List<User> users = userRepository.findByAccessToken(accessToken);
    if (users.size() == 0) {
      return null;
    }
    return users.get(0);
  }
}
