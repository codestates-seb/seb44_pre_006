package com.codestates.stackoverflow.exception;

import lombok.Getter;


public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_EXISTS(409, "등록된 회원이 이미 존재합니다."),
    QUESTION_ALREADY_EXISTS(409,"등록된 질문이 이미 존재합니다."),
    QUESTION_NOT_FOUND(404, "해당 질문을 찾을 수 없습니다."),
    QUESTION_DUPLICATED_TITLE(409, "제목이 이미 존재합니다."),
    QUESTION_UNAUTHORIZED(401,"해당 질문에 대한 (수정/삭제) 권한이 없습니다");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
