package com.codestates.stackoverflow.answer.mapper;

import com.codestates.stackoverflow.answer.dto.AnswerDTO;
import com.codestates.stackoverflow.answer.entity.Answer;
import com.codestates.stackoverflow.question.entity.Question;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-06-15T20:02:54+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 11.0.17 (Oracle Corporation)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer answerPostDtoToAnswer(AnswerDTO.Post post) {
        if ( post == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setQuestion( postToQuestion( post ) );
        answer.setBody( post.getBody() );

        return answer;
    }

    @Override
    public Answer answerPatchDtoToAnswer(AnswerDTO.Patch patch) {
        if ( patch == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setAnswerId( patch.getAnswerId() );
        answer.setBody( patch.getBody() );

        return answer;
    }

    @Override
    public AnswerDTO.Response answerToAnswerResponseDTO(Answer answer) {
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

    @Override
    public List<AnswerDTO.Response> answersToAnswerResponseDTOs(List<Answer> answers) {
        if ( answers == null ) {
            return null;
        }

        List<AnswerDTO.Response> list = new ArrayList<AnswerDTO.Response>( answers.size() );
        for ( Answer answer : answers ) {
            list.add( answerToAnswerResponseDTO( answer ) );
        }

        return list;
    }

    protected Question postToQuestion(AnswerDTO.Post post) {
        if ( post == null ) {
            return null;
        }

        Question question = new Question();

        question.setId( post.getQuestionId() );

        return question;
    }
}
