package com.codestates.stackoverflow.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    QUESTION_NOT_FOUNT(404, "해당 질문을 찾을 수 없습니다."),
    QUESTION_DUPLICATED_TITLE(409, "제목이 이미 존재합니다."),
    TAG_LIMIT_EXCEEDED(403, "태그는 3개를 초과할 수 없습니다."),
    UNAUTHORIZED(401,"해당 질문을 수정할 권한이 없습니다");
    private int status;
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
