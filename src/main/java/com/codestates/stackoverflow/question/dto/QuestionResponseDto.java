package com.codestates.stackoverflow.question.dto;

import com.codestates.stackoverflow.answer.dto.AnswerResponseDto;
import lombok.AllArgsConstructor;
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
        private String createBy;
        private LocalDateTime modifiedAt;
        private Integer answerCount;
    }
    @Getter
    @Builder
    @AllArgsConstructor
    public static class ResponseDetail {
        private Long id;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Long viewCount;
        private String createBy;
        private List<AnswerResponseDto> answers;
    }

    //회원이 등록한 Question 정보 조회할 경우
    @Getter
    @Builder
    @AllArgsConstructor
    public static class ResponseForMember {
        private Long id;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private Long viewCount;
        private String createdBy;

    }
}
