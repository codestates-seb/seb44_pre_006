package com.codestates.stackoverflow.dto;

import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
public class MultiResponseDtoWithOutPage<T> {
    Map<String, Object> data;

    public MultiResponseDtoWithOutPage(Map<String, Object> data){
        this.data = data;
    }
}