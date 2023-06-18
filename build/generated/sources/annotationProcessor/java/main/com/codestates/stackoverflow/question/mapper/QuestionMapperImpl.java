package com.codestates.stackoverflow.question.mapper;

import com.codestates.stackoverflow.question.dto.QuestionDto;
import com.codestates.stackoverflow.question.dto.QuestionResponseDto;
import com.codestates.stackoverflow.question.entity.Question;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-18T10:55:26+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 11.0.19 (Oracle Corporation)"
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
        response.modifiedAt( question.getModifiedAt() );

        response.createBy( question.getMember().getEmail() );

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

        responseDetail.createBy( question.getMember().getEmail() );

        return responseDetail.build();
    }
}
