package com.lumiad.smartlocker.couchbaserepositoryadapters;

import com.google.common.collect.Lists;
import com.lumiad.smartlocker.couchbaserepositoryadapters.repositories.SmartLockerRepository;
import com.lumiad.smartlocker.helpers.TokenGenerator;
import com.lumiad.smartlocker.models.SmartLocker;
import com.lumiad.smartlocker.repositoryports.SmartLockerRepositoryPort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class SmartLockerRepositoryAdapter implements SmartLockerRepositoryPort {
  @Autowired private SmartLockerRepository smartLockerRepository;

  @Override
  public String addSmartLocker(SmartLocker newSmartLocker) {
    newSmartLocker.setId(TokenGenerator.generateWithPrefix("SMARTLOCKER"));
    smartLockerRepository.save(newSmartLocker);
    return newSmartLocker.getId();
  }

  @Override
  public Page<SmartLocker> getSmartLockers(Pageable pageable) {
    return smartLockerRepository.findAll(pageable);
  }

  @Override
  public void deleteSmartLocker(String id) {
    smartLockerRepository.delete(id);
  }

  @Override
  public SmartLocker getSmartLocker(String id) {
    return smartLockerRepository.findOne(id);
  }

  @Override
  public void updateSmartLocker(SmartLocker smartLocker) {
    smartLockerRepository.save(smartLocker);
  }

  @Override
  public List<SmartLocker> findSmartLockersBySearchValue(String searchValue) {
    return smartLockerRepository.findSmartLockersBySearchValue("%" + searchValue + "%");
  }
}
