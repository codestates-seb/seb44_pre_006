package com.codestates.stackoverflow.question.mapper;


import com.codestates.stackoverflow.answer.mapper.AnswerMapper;
import com.codestates.stackoverflow.question.dto.QuestionDto;
import com.codestates.stackoverflow.question.dto.QuestionResponseDto;
import com.codestates.stackoverflow.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.*;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE) //upmapped 된 필드 무시하도록 추가
public interface QuestionMapper {
    Question requestToQuestion(QuestionDto.PostRequest request);

//    @Mapping(target = "createBy", expression = "java(question.getMember().getEmail())")
    QuestionResponseDto.Response questionToResponse(Question question);

    @Mapping(target = "viewCount", expression = "java(question.getViewCount() + 1)")
    @Mapping(target = "createdBy", expression = "java(question.getMember().getName())")
    QuestionResponseDto.ResponseDetail questionToDetail(Question question);

    default List<QuestionResponseDto.Response> questionsToResponses(List<Question> questions)
        {
        List<QuestionResponseDto.Response> response = questions.stream()
                .map(i -> QuestionResponseDto.Response.builder()
                        .id(i.getId())
                        .title(i.getTitle())
                        .content(i.getContent())
                        .viewCount(i.getViewCount())
                        .answerCount(i.getAnswers().size())
                        .modifiedAt(i.getModifiedAt())
                        .createBy(i.getMember().getName())
                        .build())
                .collect(Collectors.toList());

        return response;
    };
}

