package com.lumiad.smartlocker.authentication;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.lumiad.smartlocker.authentication.dto.JWTUserData;
import com.lumiad.smartlocker.authentication.dto.LoginRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.lumiad.smartlocker.authentication.config.SecurityConstants.EXPIRATION_TIME;
import static com.lumiad.smartlocker.authentication.config.SecurityConstants.HEADER_STRING;
import static com.lumiad.smartlocker.authentication.config.SecurityConstants.USER_INFO_HEADER;
import static com.lumiad.smartlocker.authentication.config.SecurityConstants.SECRET;
import static com.lumiad.smartlocker.authentication.config.SecurityConstants.TOKEN_PREFIX;


public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) {
        try {
            LoginRequest loginRequest = new ObjectMapper()
                    .readValue(req.getInputStream(), LoginRequest.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

        CustomUserDetails customUserDetails = (CustomUserDetails) auth.getPrincipal();

        JWTUserData userDetails = new JWTUserData(
                new ArrayList(customUserDetails.getAuthorities()),
                customUserDetails.getUsername(),
                customUserDetails.getFirstName(),
                customUserDetails.getLastName()
        );

        String token = JWT.create()
                .withSubject(ow.writeValueAsString(userDetails))
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET.getBytes()));

        ObjectNode userJSONObject = JsonNodeFactory.instance.objectNode();
        userJSONObject.put("userName", userDetails.getUsername());
        userJSONObject.put("firstName", userDetails.getFirstName());
        userJSONObject.put("lastName", userDetails.getLastName());
        res.addHeader(USER_INFO_HEADER, userJSONObject.toString());

        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
    }
}