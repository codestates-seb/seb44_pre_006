package com.codestates.stackoverflow.answer.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerPatchDto {
    private long answerId;
    private String content;
    public void addAnswerId(long answerId) {
        this.answerId = answerId;
    }
}
