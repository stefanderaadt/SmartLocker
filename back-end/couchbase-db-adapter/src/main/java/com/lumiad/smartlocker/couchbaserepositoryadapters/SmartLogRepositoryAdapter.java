package com.lumiad.smartlocker.couchbaserepositoryadapters;

import com.lumiad.smartlocker.couchbaserepositoryadapters.repositories.SmartLogRepository;
import com.lumiad.smartlocker.helpers.TokenGenerator;
import com.lumiad.smartlocker.models.SmartLog;
import com.lumiad.smartlocker.repositoryports.SmartLogRepositoryPort;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

public class SmartLogRepositoryAdapter implements SmartLogRepositoryPort {
    @Autowired
    private SmartLogRepository smartLogRepository;

    @Override
    public void addSmartLog(SmartLog newSmartLog) {
        newSmartLog.setId(TokenGenerator.generateWithPrefix("SMARTLOG"));
        newSmartLog.setCreatedAt(new Date());
        smartLogRepository.save(newSmartLog);
    }

    @Override
    public SmartLog getLatestSmartLogBySmartLockerId(String smartLockerId) throws NotFoundException {
        List<SmartLog> smartLog = smartLogRepository.findFirst1BySmartLockerIdOrderByCreatedAtDesc(smartLockerId);

        if(smartLog == null){
            throw new NotFoundException("SmartLog with SmartLockerId: " + smartLockerId + " was not found!");
        }
        return smartLog.get(0);
    }
}

