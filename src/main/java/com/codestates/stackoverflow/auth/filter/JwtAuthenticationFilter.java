package com.codestates.stackoverflow.auth.filter;

import com.codestates.stackoverflow.auth.dto.LoginDto;
import com.codestates.stackoverflow.auth.jwt.JwtTokenizer;
import com.codestates.stackoverflow.member.entity.Member;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

//클라이언트의 로그인 인증 요청을 처리하는 엔트리포인트 역할.
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    //로그인 인증 정보를 전달받아 UserDetailsService와 인터랙션 한 뒤 인증 여부 판단
    private final AuthenticationManager authenticationManager;

    //클라이언트가 인증에 성공할 경우, JWT를 생성 및 발급하는 역할
    private final JwtTokenizer jwtTokenizer;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }

    //메서드 내부에서 인증을 시도하는 로직.
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response){
        //클라이언트에서 전송한 Username, Password를 DTO 클래스로 역직렬화하기 위해 ObjectMapper 인스턴스 생성
        ObjectMapper objectMapper = new ObjectMapper();

        //ServletInputStream을 LoginDto 클래스의 객체로 역직렬화
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        //UsernamePasswordAuthenticationToken을 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        //UsernamePasswordAuthenticationToken을 AuthenticationManager에게 전달하면서 인증 처리 위임
        return authenticationManager.authenticate(authenticationToken);
    }

    //클라이언트의 인증 정보를 이용해 인증에 성공할 경우 호출된다.
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authReesult) throws ServletException, IOException {
        //AuthenticationManger 내부에서 인증에 성공하면 인증된 Authentication 객체가 생성되면서 principal 필드에 Member 객체 할당
        Member member = (Member) authReesult.getPrincipal();

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        //response header에 Access Token 추가. 클라이언트 측에서 백엔드 애플리케이션 측에 요청을 보낼 때마다 request header에 추가해서 클라이언트 측의 자격을 증명하는 데 사용된다.
        response.setHeader("Authorization", "Bearer " + accessToken);
        //repsonse header에 Refresh Token 추가. Access Token이 만료될 경우, 클라이언트 측이 Access Token을 새로 발급받기 위해 클라이언트에게 추가적으로 제공될 수 있음.
        response.setHeader("Refresh", refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authReesult);

    }


    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
