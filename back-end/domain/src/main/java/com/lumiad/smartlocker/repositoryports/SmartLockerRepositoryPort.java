package com.lumiad.smartlocker.repositoryports;

import com.lumiad.smartlocker.models.SmartLocker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SmartLockerRepositoryPort {

  String addSmartLocker(SmartLocker smartLocker);

  Page<SmartLocker> getSmartLockers(Pageable pageable);

  void deleteSmartLocker(String id);

  SmartLocker getSmartLocker(String id);

  void updateSmartLocker(SmartLocker smartLocker);

  List<SmartLocker> findSmartLockersBySearchValue(String searchValue);
}
