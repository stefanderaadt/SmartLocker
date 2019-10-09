package com.lumiad.smartlocker.repositoryports;

import com.lumiad.smartlocker.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserRepositoryPort {

  String addUser(User user);

  void updateUser(User user);

  List<User> getUsers();

  Page<User> getCaregivers(Pageable pageable);

  void deleteUser(String id);

  User getUser(String id);

  List<User> findByEmail(String email);

  User getUserByAccessToken(String accessToken);
}
