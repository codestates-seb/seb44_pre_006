package com.codestates.stackoverflow.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "Member not found."),
    TODO_NOT_FOUND(404, "Question not found."),

    MEMBER_EXISTS(409, "Member already exists"),
    TODO_EXSITS(409,"Question already exists.");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
