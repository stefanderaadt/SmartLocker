package com.lumiad.smartlocker.authentication.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.lumiad.smartlocker.authentication.dto.deserializers.CustomAuthorityDeserializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class JWTUserData {
    @JsonDeserialize(using = CustomAuthorityDeserializer.class)
    private Collection<? extends GrantedAuthority> authorities;
    private String username;
    private String firstName;
    private String lastName;
}
