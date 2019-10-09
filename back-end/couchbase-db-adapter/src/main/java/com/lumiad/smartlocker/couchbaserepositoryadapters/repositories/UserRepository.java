package com.lumiad.smartlocker.couchbaserepositoryadapters.repositories;

import com.lumiad.smartlocker.models.User;
import org.springframework.data.couchbase.core.query.N1qlPrimaryIndexed;
import org.springframework.data.couchbase.core.query.ViewIndexed;
import org.springframework.data.couchbase.repository.CouchbasePagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@N1qlPrimaryIndexed
@ViewIndexed(designDoc = "user")
public interface UserRepository extends CouchbasePagingAndSortingRepository<User, String> {
    List<User> findByEmail(String email);
    Page<User> findByGroupId(String groupId, Pageable pageable);
    List<User> findByAccessToken(String accessToken);
}