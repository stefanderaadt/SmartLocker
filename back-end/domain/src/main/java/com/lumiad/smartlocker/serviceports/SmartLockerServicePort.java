package com.lumiad.smartlocker.serviceports;

import com.lumiad.smartlocker.models.SmartLocker;
import com.lumiad.smartlocker.models.SmartLog;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SmartLockerServicePort {
  String addSmartLocker(SmartLocker smartLocker);

  Page<SmartLocker> getSmartLockers(Pageable pageable);

  SmartLocker getSmartLocker(String id) throws NotFoundException;

  void updateSmartLocker(SmartLocker smartLocker);

  void deleteSmartLocker(String smartLockerId);

  List<SmartLocker> findSmartLockersBySearchValue(String searchValue);

  SmartLog getLatestSmartLogBySmartLockerId(String id) throws NotFoundException;

  void addSmartLog(SmartLog smartLog);
}
