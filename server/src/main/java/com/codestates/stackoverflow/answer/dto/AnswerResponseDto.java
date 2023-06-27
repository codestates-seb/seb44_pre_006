package com.codestates.stackoverflow.answer.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnswerResponseDto {
    private long answerId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String createdBy;
}
