package com.codestates.stackoverflow.auth.handler;

import com.codestates.stackoverflow.auth.utils.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//AuthenticationException이 발생할 때의 핸들러 역할을 한다.
@Slf4j
@Component
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");
        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);
        logExceptionMessage(authException, exception);
    }

    //예외 메시지를 기록하는 내부 메서드
    private void logExceptionMessage(AuthenticationException authException, Exception exception) {
        String message = exception != null ? exception.getMessage() : authException.getMessage();
        log.warn("Unauthorized error happend: {}", message);
    }
}
