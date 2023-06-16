package com.codestates.stackoverflow.question.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

public class QuestionDto {
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PostRequest {
        @NotBlank(message = "제목을 입력해야 합니다.")
        private String title;
        @NotBlank(message = "본문을 작성해야 합니다.")
        private String content;
    }

}
