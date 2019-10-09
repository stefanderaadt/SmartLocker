package com.lumiad.smartlocker.authentication.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class LoginRequest {
    private String password;
    private String email;
}
