package com.codestates.stackoverflow.answer.controller;

import com.codestates.stackoverflow.answer.dto.AnswerPatchDto;
import com.codestates.stackoverflow.answer.dto.AnswerPostDto;
import com.codestates.stackoverflow.answer.dto.AnswerResponseDto;
import com.codestates.stackoverflow.answer.entity.Answer;
import com.codestates.stackoverflow.answer.mapper.AnswerMapper;
import com.codestates.stackoverflow.answer.service.AnswerService;
import com.codestates.stackoverflow.question.service.QuestionService;
import com.codestates.stackoverflow.response.SingleResponseDto;
import com.codestates.stackoverflow.utils.UriCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
@RestController
@RequestMapping(value = "/answers")
@Validated
public class AnswerController {
    private final static String ANSWER_DEFAULT_URL = "/answers";
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;


    public AnswerController(AnswerService answerService, AnswerMapper answerMapper) {
        this.answerService = answerService;
        this.answerMapper = answerMapper;
    }

    @PostMapping("{question-id}")
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerPostDto answerPostDto,
                                     @PathVariable("question-id") Long questionId) {
        Answer answer = answerMapper.answerPostDtoToAnswer(answerPostDto);
        Answer response = answerService.createAnswer(answer, questionId);
        URI location = UriCreator.createUri(ANSWER_DEFAULT_URL, answer.getAnswerId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@Positive @PathVariable("answer-id") long answerId,
                                      @Valid @RequestBody AnswerPatchDto answerPatchDto) {
        answerPatchDto.addAnswerId(answerId);
        Answer updatedAnswer = answerService.updateAnswer(answerMapper.answerPatchDtoToAnswer(answerPatchDto));
        return new ResponseEntity<>(new SingleResponseDto<>(answerMapper.answerToAnswerResponseDto(updatedAnswer)), HttpStatus.OK);
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") @Positive long answerId) {
        Answer foundAnswer = answerService.findAnswer(answerId);
        AnswerResponseDto answerToAnswerResponseDto = answerMapper.answerToAnswerResponseDto(foundAnswer);
        return ResponseEntity.ok(new SingleResponseDto<>(answerToAnswerResponseDto));


    }
    @GetMapping
    public ResponseEntity getAnswers(@RequestParam @Positive int page,
                                     @RequestParam @Positive int size) {
        Page<Answer> pageAnswers = answerService.findAnswers(page-1, size);
        List<Answer> answers = pageAnswers.getContent();

        return new ResponseEntity<>(answerMapper.answersToAnswerResponseDtos(answers), HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(
            @PathVariable("answer-id") @Positive long answerId) {
        answerService.deleteAnswer(answerId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}

