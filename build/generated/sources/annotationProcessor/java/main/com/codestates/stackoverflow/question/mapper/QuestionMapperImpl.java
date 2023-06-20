package com.codestates.stackoverflow.question.mapper;

import com.codestates.stackoverflow.answer.dto.AnswerResponseDto;
import com.codestates.stackoverflow.answer.entity.Answer;
import com.codestates.stackoverflow.question.dto.QuestionDto;
import com.codestates.stackoverflow.question.dto.QuestionResponseDto;
import com.codestates.stackoverflow.question.entity.Question;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-20T14:09:32+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 11.0.17 (Oracle Corporation)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public Question requestToQuestion(QuestionDto.PostRequest request) {
        if ( request == null ) {
            return null;
        }

        Question question = new Question();

        question.setTitle( request.getTitle() );
        question.setContent( request.getContent() );

        return question;
    }

    @Override
    public QuestionResponseDto.Response questionToResponse(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionResponseDto.Response.ResponseBuilder response = QuestionResponseDto.Response.builder();

        response.title( question.getTitle() );
        response.content( question.getContent() );
        response.viewCount( question.getViewCount() );
        response.createBy( question.getCreateBy() );
        response.modifiedAt( question.getModifiedAt() );

        return response.build();
    }

    @Override
    public QuestionResponseDto.ResponseDetail questionToDetail(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionResponseDto.ResponseDetail.ResponseDetailBuilder responseDetail = QuestionResponseDto.ResponseDetail.builder();

        responseDetail.id( question.getId() );
        responseDetail.title( question.getTitle() );
        responseDetail.content( question.getContent() );
        responseDetail.createdAt( question.getCreatedAt() );
        responseDetail.modifiedAt( question.getModifiedAt() );
        responseDetail.viewCount( question.getViewCount() );
        responseDetail.createBy( question.getCreateBy() );
        responseDetail.answers( answerListToAnswerResponseDtoList( question.getAnswers() ) );

        return responseDetail.build();
    }

    protected AnswerResponseDto answerToAnswerResponseDto(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        AnswerResponseDto.AnswerResponseDtoBuilder answerResponseDto = AnswerResponseDto.builder();

        if ( answer.getAnswerId() != null ) {
            answerResponseDto.answerId( answer.getAnswerId() );
        }
        answerResponseDto.content( answer.getContent() );
        answerResponseDto.createdAt( answer.getCreatedAt() );
        answerResponseDto.modifiedAt( answer.getModifiedAt() );
        answerResponseDto.createdBy( answer.getCreatedBy() );

        return answerResponseDto.build();
    }

    protected List<AnswerResponseDto> answerListToAnswerResponseDtoList(List<Answer> list) {
        if ( list == null ) {
            return null;
        }

        List<AnswerResponseDto> list1 = new ArrayList<AnswerResponseDto>( list.size() );
        for ( Answer answer : list ) {
            list1.add( answerToAnswerResponseDto( answer ) );
        }

        return list1;
    }
}
