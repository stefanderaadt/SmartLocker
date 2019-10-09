package com.lumiad.smartlocker.couchbaserepositoryadapters.repositories;

import com.lumiad.smartlocker.models.SmartLocker;
import org.springframework.data.couchbase.core.query.N1qlPrimaryIndexed;
import org.springframework.data.couchbase.core.query.Query;
import org.springframework.data.couchbase.core.query.ViewIndexed;
import org.springframework.data.couchbase.repository.CouchbasePagingAndSortingRepository;

import java.util.List;

@N1qlPrimaryIndexed
@ViewIndexed(designDoc = "smartLocker")
public interface SmartLockerRepository
    extends CouchbasePagingAndSortingRepository<SmartLocker, String> {

  @Query(
      "#{#n1ql.selectEntity} WHERE #{#n1ql.filter} AND (LOWER(address.city) LIKE LOWER($1) OR LOWER(address.postalCode) LIKE LOWER($1) OR LOWER(address.street) LIKE LOWER($1) OR LOWER(address.streetNumber) LIKE LOWER($1) OR LOWER(patient.firstName) LIKE LOWER($1) OR LOWER(patient.lastName) LIKE LOWER($1)) LIMIT 6")
  List<SmartLocker> findSmartLockersBySearchValue(String searchValue);
}
