package com.codestates.stackoverflow.auth.handler;

import com.codestates.stackoverflow.response.ErrorResponse;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        log.error("# Authentication failed: {}", exception.getMessage());

        sendErrorResponse(response);
    }

    private void sendErrorResponse(HttpServletResponse response) throws IOException {
        //Error 정보가 담긴 객체를 JSON 문자열로 변환하는 데 사용되는 Gson 라이브러리의 인스턴스를 생성한다.
        Gson gson = new Gson();

        //ErrorResponse 객체를 생성
        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED);

        //response의 ContentType이 application/json 이라는 것을 클라이언트에게 알려주기 위함.
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        //Gson을 이용해 ErrorResponse 객체를 JSON 포맷 문자열로 변환 후, 출력 스트림 생성
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
        /*
            {
                "status": 401,
                "message": "Unauthorized"
            }
         */
    }

}
