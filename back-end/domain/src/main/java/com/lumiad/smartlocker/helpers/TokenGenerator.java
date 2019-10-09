package com.lumiad.smartlocker.helpers;

import java.security.SecureRandom;
import java.util.UUID;

public class TokenGenerator {
  private TokenGenerator() {}

  private static final String characters =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  private static SecureRandom secureRandom = new SecureRandom();

  public static String generateWithPrefix(String prefix) {
    return prefix + "::" + UUID.randomUUID();
  }

  public static String generateRandomString(int len) {
    StringBuilder sb = new StringBuilder(len);
    for (int i = 0; i < len; i++)
      sb.append(characters.charAt(secureRandom.nextInt(characters.length())));
    return sb.toString();
  }
}
