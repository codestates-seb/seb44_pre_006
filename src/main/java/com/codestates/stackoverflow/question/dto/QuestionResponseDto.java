package com.codestates.stackoverflow.question.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;


public class QuestionResponseDto {
    @Getter
    @Builder
    public static class Response {
        private String title;
        private String content;
        private Long viewCount;
//        private Integer answerCount;
        private LocalDateTime modifiedAt;
    }
    @Getter
    @Builder
    public static class ResponseDetail {
        private Long id;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Long viewCount;
//        private List<AnswerDTO.Response> answers;
    }
}
