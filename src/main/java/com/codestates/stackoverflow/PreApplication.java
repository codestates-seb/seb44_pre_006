package com.codestates.stackoverflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PreApplication {

	public static void main(String[] args) {
		SpringApplication.run(PreApplication.class, args);
	}

}
