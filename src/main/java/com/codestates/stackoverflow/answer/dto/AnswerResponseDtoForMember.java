package com.codestates.stackoverflow.answer.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class AnswerResponseDtoForMember {
    private Long answerId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
