package com.codestates.stackoverflow.answer.mapper;

import com.codestates.stackoverflow.answer.dto.AnswerPatchDto;
import com.codestates.stackoverflow.answer.dto.AnswerPostDto;
import com.codestates.stackoverflow.answer.dto.AnswerResponseDto;
import com.codestates.stackoverflow.answer.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerPostDto requestBody);
    Answer answerPatchDtoToAnswer(AnswerPatchDto requestBody);

    @Mapping(target = "createdBy", expression = "java(answer.getMember().getName())")
    AnswerResponseDto answerToAnswerResponseDto(Answer answer);
    default List<AnswerResponseDto> answersToAnswerResponseDtos(List<Answer> answers){
        List<AnswerResponseDto> response=answers.stream()
                .map(answer->AnswerResponseDto.builder()
                        .answerId(answer.getAnswerId())
                        .content(answer.getContent())
                        .createdAt(answer.getCreatedAt())
                        .modifiedAt(answer.getModifiedAt())
                        .createdBy(answer.getMember().getName())
                        .build())
                .collect(Collectors.toList());
        return response;
    }

}