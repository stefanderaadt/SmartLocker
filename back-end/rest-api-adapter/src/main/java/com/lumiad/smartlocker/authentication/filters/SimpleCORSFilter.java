package com.lumiad.smartlocker.authentication.filters;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.lumiad.smartlocker.authentication.config.SecurityConstants.HEADER_STRING;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SimpleCORSFilter implements Filter {

  @Override
  public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
      throws IOException, ServletException {

    HttpServletRequest request = (HttpServletRequest) req;
    HttpServletResponse response = (HttpServletResponse) res;

    response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    response.setHeader("Access-Control-Max-Age", "3600");
    response.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Accept, X-Requested-With, remember-me, " + HEADER_STRING);
    response.setHeader("Access-Control-Expose-Headers", HEADER_STRING);

    chain.doFilter(req, res);
  }

  @Override
  public void init(FilterConfig filterConfig) {
    // Won't work without @Override
  }

  @Override
  public void destroy() {
    // Won't work without @Override
  }
}
