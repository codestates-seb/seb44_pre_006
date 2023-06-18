package com.codestates.stackoverflow.answer.mapper;

import com.codestates.stackoverflow.answer.dto.AnswerPatchDto;
import com.codestates.stackoverflow.answer.dto.AnswerPostDto;
import com.codestates.stackoverflow.answer.dto.AnswerResponseDto;
import com.codestates.stackoverflow.answer.entity.Answer;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-17T21:01:23+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer answerPostDtoToAnswer(AnswerPostDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setContent( requestBody.getContent() );

        return answer;
    }

    @Override
    public Answer answerPatchDtoToAnswer(AnswerPatchDto requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setAnswerId( requestBody.getAnswerId() );
        answer.setContent( requestBody.getContent() );

        return answer;
    }

    @Override
    public AnswerResponseDto answerToAnswerResponseDto(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        AnswerResponseDto answerResponseDto = new AnswerResponseDto();

        if ( answer.getAnswerId() != null ) {
            answerResponseDto.setAnswerId( answer.getAnswerId() );
        }
        answerResponseDto.setContent( answer.getContent() );
        answerResponseDto.setCreatedAt( answer.getCreatedAt() );
        answerResponseDto.setModifiedAt( answer.getModifiedAt() );

        return answerResponseDto;
    }

    @Override
    public List<AnswerResponseDto> answersToAnswerResponseDtos(List<Answer> answers) {
        if ( answers == null ) {
            return null;
        }

        List<AnswerResponseDto> list = new ArrayList<AnswerResponseDto>( answers.size() );
        for ( Answer answer : answers ) {
            list.add( answerToAnswerResponseDto( answer ) );
        }

        return list;
    }
}
