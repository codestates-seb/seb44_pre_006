package com.codestates.stackoverflow.question.mapper;

import com.codestates.stackoverflow.answer.dto.AnswerDTO;
import com.codestates.stackoverflow.answer.entity.Answer;
import com.codestates.stackoverflow.question.dto.QuestionDto;
import com.codestates.stackoverflow.question.dto.QuestionResponseDto;
import com.codestates.stackoverflow.question.entity.Question;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-16T02:38:37+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 11.0.17 (Oracle Corporation)"
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

        response.answerCount( question.getAnswers().size() );

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
        responseDetail.answers( answerListToResponseList( question.getAnswers() ) );

        return responseDetail.build();
    }

    protected AnswerDTO.Response answerToResponse(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        long answerId = 0L;
        String body = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        if ( answer.getAnswerId() != null ) {
            answerId = answer.getAnswerId();
        }
        body = answer.getBody();
        createdAt = answer.getCreatedAt();
        modifiedAt = answer.getModifiedAt();

        AnswerDTO.Response response = new AnswerDTO.Response( answerId, body, createdAt, modifiedAt );

        return response;
    }

    protected List<AnswerDTO.Response> answerListToResponseList(List<Answer> list) {
        if ( list == null ) {
            return null;
        }

        List<AnswerDTO.Response> list1 = new ArrayList<AnswerDTO.Response>( list.size() );
        for ( Answer answer : list ) {
            list1.add( answerToResponse( answer ) );
        }

        return list1;
    }
}
