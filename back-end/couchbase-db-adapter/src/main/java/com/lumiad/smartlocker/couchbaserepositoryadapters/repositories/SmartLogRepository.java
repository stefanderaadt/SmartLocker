package com.lumiad.smartlocker.couchbaserepositoryadapters.repositories;

import com.lumiad.smartlocker.models.SmartLog;
import org.springframework.data.couchbase.core.query.N1qlPrimaryIndexed;
import org.springframework.data.couchbase.core.query.ViewIndexed;
import org.springframework.data.couchbase.repository.CouchbasePagingAndSortingRepository;

import java.util.List;

@N1qlPrimaryIndexed
@ViewIndexed(designDoc = "smartlog")
public interface SmartLogRepository extends CouchbasePagingAndSortingRepository<SmartLog, String> {

    List<SmartLog> findFirst1BySmartLockerIdOrderByCreatedAtDesc(String smartLockerId);
}
