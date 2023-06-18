package com.codestates.stackoverflow.question.dto;

import lombok.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;

public class QuestionDto {
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PostRequest {
        @NotBlank(message = "제목을 입력해야 합니다.")
        @Max(value = 150, message = "제목은 최대 150자까지 입력할 수 있습니다.")
        private String title;
        @NotBlank(message = "본문을 작성해야 합니다.")
        private String content;
    }

}
