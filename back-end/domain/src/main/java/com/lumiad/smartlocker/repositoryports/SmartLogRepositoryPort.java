package com.lumiad.smartlocker.repositoryports;

import com.lumiad.smartlocker.models.SmartLog;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;

import java.util.List;

public interface SmartLogRepositoryPort {
    void addSmartLog(SmartLog smartLog);

    SmartLog getLatestSmartLogBySmartLockerId(String smartLockerId) throws NotFoundException;
}
