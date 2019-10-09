package com.lumiad.smartlocker.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {
  @GetMapping("/check")
  @ResponseBody
  public void checkLogin() {
    // No implementation needed
  }
}
