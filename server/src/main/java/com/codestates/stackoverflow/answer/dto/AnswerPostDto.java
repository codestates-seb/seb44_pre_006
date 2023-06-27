package com.codestates.stackoverflow.answer.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
@NoArgsConstructor
public class AnswerPostDto {
    @NotBlank
    private String content;

    public AnswerPostDto(String content) {
        this.content = content;
    }
}
