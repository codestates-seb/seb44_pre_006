package com.codestates.stackoverflow.exception;

import lombok.Getter;

@Getter
public class BusinessLoginException extends RuntimeException {
    private ExceptionCode exceptionCode;
    public BusinessLoginException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
