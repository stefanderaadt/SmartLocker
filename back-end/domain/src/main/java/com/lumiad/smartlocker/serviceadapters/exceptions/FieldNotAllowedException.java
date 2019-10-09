package com.lumiad.smartlocker.serviceadapters.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST)
public class FieldNotAllowedException extends Exception {
    public FieldNotAllowedException(String errorMessage){
        super(errorMessage);
    }
}
