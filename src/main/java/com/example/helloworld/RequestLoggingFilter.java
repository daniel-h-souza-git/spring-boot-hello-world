package com.example.helloworld;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Registra cada requisição HTTP recebida (entrada) e o resultado (status e duração).
 */
@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    protected boolean shouldNotFilterErrorDispatch() {
        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String method = request.getMethod();
        String uri = request.getRequestURI()
                + (request.getQueryString() != null ? "?" + request.getQueryString() : "");
        String client = request.getRemoteAddr();
        String origin = request.getHeader("Origin");

        log.info("--> {} {} (cliente={}{})", method, uri, client, origin != null ? ", origin=" + origin : "");

        long start = System.currentTimeMillis();
        try {
            chain.doFilter(request, response);
        } catch (Exception e) {
            log.error("<-- {} {} falhou com exceção não tratada: {}", method, uri, e.toString(), e);
            throw e;
        } finally {
            long elapsed = System.currentTimeMillis() - start;
            int status = response.getStatus();
            if (status >= 500) {
                log.error("<-- {} {} status={} ({} ms)", method, uri, status, elapsed);
            } else if (status >= 400) {
                log.warn("<-- {} {} status={} ({} ms)", method, uri, status, elapsed);
            } else {
                log.info("<-- {} {} status={} ({} ms)", method, uri, status, elapsed);
            }
        }
    }
}
