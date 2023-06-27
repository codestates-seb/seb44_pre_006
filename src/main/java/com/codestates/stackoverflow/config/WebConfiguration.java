package com.codestates.stackoverflow.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://mytodoawsbucket.s3-website.ap-northeast-2.amazonaws.com/")
                .allowedMethods("GET", "POST", "PATCH", "DELETE")
                .allowedHeaders("Authorization")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
