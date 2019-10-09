package com.lumiad.smartlocker.helpers;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class RequestToPageable {
  public static Pageable get(int page, int size, String sort, String sortDirection) {

    PageRequest pageRequest;

    if (sort != null && !sort.isEmpty()) {
      pageRequest =
          new PageRequest(
              page,
              size,
              new Sort(
                  sortDirection.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, sort));
    } else {
      pageRequest = new PageRequest(page, size);
    }

    return pageRequest;
  }
}
