package com.lumiad.smartlocker.couchbaserepositoryadapters;

import com.google.common.collect.Lists;
import com.lumiad.smartlocker.couchbaserepositoryadapters.repositories.GroupRepository;
import com.lumiad.smartlocker.models.Group;
import com.lumiad.smartlocker.repositoryports.GroupRepositoryPort;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class GroupRepositoryAdapter implements GroupRepositoryPort {
  @Autowired private GroupRepository groupRepository;

  @Override
  public String addGroup(Group newGroup) {
    newGroup.setId("GROUP::" + newGroup.getName());
    Group savedGroup = groupRepository.save(newGroup);
    return savedGroup.getId();
  }

  @Override
  public List<Group> getGroups() {
    return Lists.newArrayList(groupRepository.findAll());
  }

  @Override
  public Group getGroup(String id) {
    return groupRepository.findOne(id);
  }
}
