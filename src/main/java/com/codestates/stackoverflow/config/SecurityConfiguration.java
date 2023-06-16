package com.codestates.stackoverflow.config;

import com.codestates.stackoverflow.auth.filter.JwtAuthenticationFilter;
import com.codestates.stackoverflow.auth.filter.JwtVerificationFilter;
import com.codestates.stackoverflow.auth.handler.MemberAccessDeniedHandler;
import com.codestates.stackoverflow.auth.handler.MemberAuthenticationEntryPoint;
import com.codestates.stackoverflow.auth.handler.MemberAuthenticationFailureHandler;
import com.codestates.stackoverflow.auth.handler.MemberAuthenticationSuccessHandler;
import com.codestates.stackoverflow.auth.jwt.JwtTokenizer;
import com.codestates.stackoverflow.auth.utils.CustomAuthorityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;


    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(Customizer.withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //세션을 생성하지 않도록 설정한다.
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint()) //예외 처리 추가
                .accessDeniedHandler(new MemberAccessDeniedHandler()) //예외 처리 추가
                .and()
                .apply(new CustomFilterConfigurer())//커스터마이징된 Configuration 추가
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/users").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/users/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET,"/users/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/users").permitAll() //전체 user 정보
                        .antMatchers(HttpMethod.DELETE, "/users").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/users/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.POST, "/questions").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/questions/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/questions").permitAll()
                        .antMatchers(HttpMethod.GET, "/questions/search").permitAll() //question 검색은 누구나 가능
                        .antMatchers(HttpMethod.DELETE, "/questions/**").hasAnyRole("USER", "ADMIN")

                        .anyRequest().permitAll()
                );


        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        UrlBasedCorsConfigurationSource  source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    //JwtAuthenticationFilter를 등록하는 역할
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception{
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/users/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);


            builder
                    .addFilter(jwtAuthenticationFilter) //JwtAuthenticationFilter를 Spring Security Filter Chain에 추가한다.
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class); //JwtAuthenticationFilter에서 로그인 인증을 성공한 후 발급받은 JWT가 클라이언트의 request header에 포함되어 있을 경우에만 동작한다.

        }
    }

}
