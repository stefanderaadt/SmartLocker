package com.lumiad.smartlocker.serviceports;

import com.lumiad.smartlocker.models.Group;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;

import java.util.List;

public interface GroupServicePort {
    String addGroup(Group group);
    List<Group> getAllGroups();
    Group getGroup(String id) throws NotFoundException;
}
