package com.lumiad.smartlocker.serviceadapters.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST)
public class InvalidGroupIdException extends Exception {
    public InvalidGroupIdException(String errorMessage){
        super(errorMessage);
    }
}
