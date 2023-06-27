package com.codestates.stackoverflow.auth.filter;

import com.codestates.stackoverflow.auth.jwt.JwtTokenizer;
import com.codestates.stackoverflow.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

//클라이언트 측에서 전송된 request header에 포함된 JWT에 대해 검증 작업을 수행하는 JwtVerificationFilter
public class JwtVerificationFilter extends OncePerRequestFilter { //request 당 한 번만 실행되는 Security Filter를 구현할 수 있다.
    private final JwtTokenizer jwtTokenizer; //JWT를 검증하고 Claims를 얻는 데 사용됨.

    private final CustomAuthorityUtils authorityUtils;//JWT 검증에 성공하면 Authentication 객체를 채율 사용자의 권한을 생성하는 데 사용됨.

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //예외 처리가 추가됨. 추가된 애트리뷰트는 AthenticationEntryPoint에서 사용할 수 있다.
        //예외가 발생하게 되면 SecurityContext에 Authentication 객체가 저장되지 않음.
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        //JWT의 서명 검증에 성공하고, Security Context에 Authentication을 저장한 뒤에는 다음 Security Filter를 호출한다.
        filterChain.doFilter(request, response);
    }

    //특정 조건에 부합하면(true이면) 해당 Filter의 동작을 수행하지 않고 다음 Filter로 건너뛰도록 해준다.
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        //JWT가 Authorization header에 포함되지 않았다면 JWT 자격 증명이 필요하지 않은 리소스에 대한 요청이라고 판단하고 다음 Filter로 처리를 넘긴다.
        String authorization = request.getHeader("Authorization");
        return authorization == null || !authorization.startsWith("Bearer");
    }

    //JWT를 검증하는 데 사용되는 private 메서드
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        //request의 header에서 JWT를 얻고 있다.
        String jws = request.getHeader("Authorization").replace("Bearer ", "");

        //JWT 서명을 검증하기 위한 Secret Key를 얻는다.
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        //JWT에서 Claims를 파싱 -> 정상적으로 파싱되면 서명 검증 역시 자연스럽게 성공한 것.
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    //Authentication 객체를 SecurityContext에 저장하기 위한 priavte 메서드
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

    }

}


