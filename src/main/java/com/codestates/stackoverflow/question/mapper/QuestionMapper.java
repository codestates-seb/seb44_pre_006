package com.codestates.stackoverflow.question.mapper;


import com.codestates.stackoverflow.question.dto.QuestionDto;
import com.codestates.stackoverflow.question.dto.QuestionResponseDto;
import com.codestates.stackoverflow.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.*;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question requestToQuestion(QuestionDto.PostRequest request);

//    @Mapping(target = "answerCount", expression = "java(question.getAnswers().size())")
    QuestionResponseDto.Response questionToResponse(Question question);

    QuestionResponseDto.ResponseDetail questionToDetail(Question question);


//    @Mapping(target = "answers", expression = "java(questions.getAnswers().size())")
    default List<QuestionResponseDto.Response> questionsToResponses(List<Question> questions)
        {
        List<QuestionResponseDto.Response> response = questions.stream()
                .map(i -> QuestionResponseDto.Response.builder()
                        .title(i.getTitle())
                        .content(i.getContent())
                        .viewCount(i.getViewCount())
//                        .answerCount(i.getAnswers().size())
                        .build())
                .collect(Collectors.toList());

        return response;
    };
//    List<QuestionResponseDto.ResponseTags> questionsToTags(List<Question> questionts);
//    @Mapping(source = "question.tags", target = "responseTags.tags", qualifiedByName = "mapTags")
//    default List<QuestionResponseDto.ResponseTags> questionsToTags(List<Question> questionts)
//    {
//        List<QuestionResponseDto.ResponseTags> response = questionts
//                .stream()
//                .map(i -> QuestionResponseDto.ResponseTags.builder()
//                        .title(i.getTitle())
//                        .content(i.getContent())
//                        .viewCount(i.getViewCount())
//                        .tags(i.getTags().split(" "))
//                        .build())
//                .collect(Collectors.toList());
//
//        return response;
//    };
//
//    @Named("QuestionMapper.mapTags")
//    default String[] mapTags(String tags) {
//        // 태그 문자열을 분리하여 String[]로 변환하는 로직 구현
//        String[] tagArray = tags.split(","); // 예시: 쉼표를 기준으로 태그 분리
//        return tagArray;
//    }
}

