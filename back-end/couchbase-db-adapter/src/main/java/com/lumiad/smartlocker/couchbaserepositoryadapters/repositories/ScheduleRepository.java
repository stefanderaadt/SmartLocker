package com.lumiad.smartlocker.couchbaserepositoryadapters.repositories;

import com.lumiad.smartlocker.models.Schedule;
import org.springframework.data.couchbase.core.query.N1qlPrimaryIndexed;
import org.springframework.data.couchbase.core.query.Query;
import org.springframework.data.couchbase.core.query.ViewIndexed;
import org.springframework.data.couchbase.repository.CouchbasePagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@N1qlPrimaryIndexed
@ViewIndexed(designDoc = "schedule")
public interface ScheduleRepository extends CouchbasePagingAndSortingRepository<Schedule, String> {
  Page<Schedule> findByUserId(String userId, Pageable pageable);

  @Query("#{#n1ql.selectEntity} WHERE #{#n1ql.filter} AND userId = $1 AND smartLockerId = $2 AND ($3 BETWEEN dateFrom AND dateTo)")
  List<Schedule> getCurrentActiveSchedulesByUserAndSmarterLockerId(String userId, String smartLockerId, long currentTime);

  @Query("#{#n1ql.selectEntity} WHERE #{#n1ql.filter} AND userId = $1 AND ((dateFrom BETWEEN $2 AND $3) OR ($2 BETWEEN dateFrom AND dateTo))")
  List<Schedule> getUsersByUserIdAndInScheduleRange(String userId, long startDate, long endDate);
}

