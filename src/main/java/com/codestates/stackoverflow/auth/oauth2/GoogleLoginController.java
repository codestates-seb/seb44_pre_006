package com.codestates.stackoverflow.auth.oauth2;

import com.codestates.stackoverflow.auth.jwt.JwtTokenizer;
import com.codestates.stackoverflow.member.entity.Member;
import com.codestates.stackoverflow.member.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class GoogleLoginController {

    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    public GoogleLoginController(JwtTokenizer jwtTokenizer, MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }

    @GetMapping("/oauth2/authorization/google")
    public void handleGoogleLogin(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        // Google 로그인 상태 확인 로직 수행
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            // 이미 Google 로그인이 된 상태이므로 추가 로직을 수행하거나 리다이렉션 처리
            Member findMember=memberService.authenticationMember();
            Long memberId = findMember.getMemberId();
            List<String> authorities = findMember.getRoles();
            System.out.println("findMember: "+findMember.getEmail());
            redirect(request, response, findMember.getEmail(), authorities, memberId);
        }
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username, List<String> authorities, Long memberId) throws IOException {
        String accessToken = delegateAccessToken(username, authorities);
        String refreshToken = delegateRefreshToken(username);

        String uri = createURI(accessToken, refreshToken,memberId).toString();
        response.sendRedirect(uri);
    }

    private String delegateAccessToken(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken, Long memberId) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);
        queryParams.add("member_id", memberId+"");

        System.out.println("access_token:"+accessToken);
        System.out.println("refresh_token:"+refreshToken);
        System.out.println("member_id:" + memberId);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(8081)
                .path("/")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
