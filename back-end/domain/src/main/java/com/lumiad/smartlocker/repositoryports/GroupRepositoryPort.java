package com.lumiad.smartlocker.repositoryports;

import com.lumiad.smartlocker.models.Group;

import java.util.List;

public interface GroupRepositoryPort {

  String addGroup(Group group);

  List<Group> getGroups();

  Group getGroup(String id);
}
