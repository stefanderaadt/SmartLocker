package com.lumiad.smartlocker.serviceadapters;

import com.lumiad.smartlocker.models.Group;
import com.lumiad.smartlocker.repositoryports.GroupRepositoryPort;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import com.lumiad.smartlocker.serviceports.GroupServicePort;

import java.util.List;

public class GroupServiceAdapter implements GroupServicePort {
    private GroupRepositoryPort groupRepository;

    public GroupServiceAdapter(GroupRepositoryPort groupRepository) {
        this.groupRepository = groupRepository;
    }

    @Override
    public String addGroup(Group newGroup) {
        return groupRepository.addGroup(newGroup);
    }

    @Override
    public List<Group> getAllGroups() {
        return groupRepository.getGroups();
    }

    @Override
    public Group getGroup(String id) throws NotFoundException {
        Group group = groupRepository.getGroup(id);

        if(group == null){
            throw new NotFoundException("Group with id: " + id + " does not exist.");
        }

        return group;
    }
}
