package com.codestates.stackoverflow.auth.handler;

import com.codestates.stackoverflow.member.entity.Member;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // 인증 성공 후 로그를 기록.
        log.info("# Authenticated successfully!");

//        Member member = (Member)authentication.getPrincipal();
//        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//        response.setStatus(HttpStatus.OK.value());
//
//        //HttpServletResponse의 getWriter는 PrintWriter 객체를 반환
//        response.getWriter().write("Authentication success! User : " + member.getName());
//
//        //PrintWriter의 버퍼를 비우고, 현재까지 버퍼에 쌓인 데이터를 실제 출력 스트림으로 보냄.
//        response.getWriter().flush();
        Member member = (Member)authentication.getPrincipal();
        Map<String, String> responseData = new HashMap<>();
        responseData.put("name", member.getName());
        responseData.put("memberId", member.getMemberId()+"");

        // JSON 변환
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(responseData);

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.OK.value());
        response.getWriter().write(json);
        response.getWriter().flush();
    }
}
