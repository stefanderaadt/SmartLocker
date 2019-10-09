package com.lumiad.smartlocker.serviceadapters;

import com.lumiad.smartlocker.models.SmartLocker;
import com.lumiad.smartlocker.models.SmartLog;
import com.lumiad.smartlocker.repositoryports.SmartLockerRepositoryPort;
import com.lumiad.smartlocker.repositoryports.SmartLogRepositoryPort;
import com.lumiad.smartlocker.serviceadapters.exceptions.NotFoundException;
import com.lumiad.smartlocker.serviceports.SmartLockerServicePort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class SmartLockerServiceAdapter implements SmartLockerServicePort {
  private SmartLockerRepositoryPort smartLockerRepository;
  private SmartLogRepositoryPort smartLogRepository;

  public SmartLockerServiceAdapter(
      SmartLockerRepositoryPort smartLockerRepository, SmartLogRepositoryPort smartLogRepository) {
    this.smartLockerRepository = smartLockerRepository;
    this.smartLogRepository = smartLogRepository;
  }

  @Override
  public String addSmartLocker(SmartLocker smartLocker) {
    return smartLockerRepository.addSmartLocker(smartLocker);
  }

  @Override
  public Page<SmartLocker> getSmartLockers(Pageable pageable) {
    return smartLockerRepository.getSmartLockers(pageable);
  }

  @Override
  public SmartLocker getSmartLocker(String id) throws NotFoundException {
    SmartLocker smartLocker = smartLockerRepository.getSmartLocker(id);

    if (smartLocker == null) {
      throw new NotFoundException("SmartLocker with id: " + id + " does not exist.");
    }

    return smartLocker;
  }

  @Override
  public void updateSmartLocker(SmartLocker smartLocker) {
    smartLockerRepository.updateSmartLocker(smartLocker);
  }

  @Override
  public void deleteSmartLocker(String id) {
    smartLockerRepository.deleteSmartLocker(id);
  }

  @Override
  public List<SmartLocker> findSmartLockersBySearchValue(String searchValue) {
    return smartLockerRepository.findSmartLockersBySearchValue(searchValue);
  }

  @Override
  public SmartLog getLatestSmartLogBySmartLockerId(String smartLockerId) throws NotFoundException {
    return smartLogRepository.getLatestSmartLogBySmartLockerId(smartLockerId);
  }

  @Override
  public void addSmartLog(SmartLog smartLog) {
    smartLogRepository.addSmartLog(smartLog);
  }
}
