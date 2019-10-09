package com.lumiad.smartlocker.helpers;

import org.slf4j.LoggerFactory;

public class Logger {
  private org.slf4j.Logger currentLogger = LoggerFactory.getLogger(Logger.class);

  public void warn(String message) {
    currentLogger.warn(message);
  }

  public void trace(String message) {
    currentLogger.trace(message);
  }

  public void error(String message) {
    currentLogger.error(message);
  }

  public void debug(String message) {
    currentLogger.debug(message);
  }

  public void info(String message) {
    currentLogger.info(message);
  }
}
