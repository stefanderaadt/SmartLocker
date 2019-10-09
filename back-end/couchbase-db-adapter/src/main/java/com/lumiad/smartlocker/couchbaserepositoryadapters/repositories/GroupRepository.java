package com.lumiad.smartlocker.couchbaserepositoryadapters.repositories;

import com.lumiad.smartlocker.models.Group;
import org.springframework.data.couchbase.core.query.N1qlPrimaryIndexed;
import org.springframework.data.couchbase.core.query.ViewIndexed;
import org.springframework.data.couchbase.repository.CouchbasePagingAndSortingRepository;

@N1qlPrimaryIndexed
@ViewIndexed(designDoc = "group")
public interface GroupRepository extends CouchbasePagingAndSortingRepository<Group, String> {
}