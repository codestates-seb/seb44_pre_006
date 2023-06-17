package com.codestates.stackoverflow.answer.controller;

import com.codestates.stackoverflow.answer.dto.AnswerPatchDto;
import com.codestates.stackoverflow.answer.dto.AnswerPostDto;
import com.codestates.stackoverflow.answer.dto.AnswerResponseDto;
import com.codestates.stackoverflow.answer.entity.Answer;
import com.codestates.stackoverflow.answer.mapper.AnswerMapper;
import com.codestates.stackoverflow.answer.service.AnswerService;
import com.codestates.stackoverflow.response.SingleResponseDto;
import com.codestates.stackoverflow.utils.UriCreator;
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
@RequestMapping(value = "/answer")
@Validated
public class AnswerController {
    private final static String ANSWER_DEFAULT_URL = "/answer";
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;

    public AnswerController(AnswerService answerService, AnswerMapper answerMapper) {
        this.answerService = answerService;
        this.answerMapper = answerMapper;
    }

    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerPostDto answerPostDto) {
        // 연관관계는 따로 Entity에서 설정해주면 됩니다! 따로 값을 받아올 필요는 없습니다.
        //TODO 인증된 사용자만 답변을 등록할 수 있도록 로직 구성해야 합니다(추후에)

        Answer answer = answerMapper.answerPostDtoToAnswer(answerPostDto);
        Answer response = answerService.createAnswer(answer);
        URI location = UriCreator.createUri(ANSWER_DEFAULT_URL, answer.getAnswerId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@Positive @PathVariable("answer-id") long answerId,
                                      @Valid @RequestBody AnswerPatchDto answerPatchDto) {
        //TODO 해당 답글을 작성한 사용자만 수정을 할 수 있도록 해야 합니다.(추후에)
        //TODO requestBody에 url에서 받아온 answer-id를 할당해 줍니다.
        answerPatchDto.addAnswerId(answerId);
        Answer updatedAnswer = answerService.updateAnswer(answerMapper.answerPatchDtoToAnswer(answerPatchDto));
        return new ResponseEntity<>(answerMapper.answerToAnswerResponseDto(updatedAnswer), HttpStatus.OK);
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") @Positive long answerId) {
        Answer foundAnswer = answerService.findAnswer(answerId);
        AnswerResponseDto answerToAnswerResponseDto = answerMapper.answerToAnswerResponseDto(foundAnswer);
        return ResponseEntity.ok(new SingleResponseDto<>(answerToAnswerResponseDto));


    }
    @GetMapping
    public ResponseEntity getAnswers() {
        List<Answer> answers = answerService.findAnswers();
        List<AnswerResponseDto> response = answerMapper.answersToAnswerResponseDtos(answers);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswerId(
            @PathVariable("answer-id") @Positive long answerId) {
        answerService.deleteAnswer(answerId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}

