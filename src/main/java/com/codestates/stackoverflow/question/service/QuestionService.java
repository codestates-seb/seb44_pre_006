package com.codestates.stackoverflow.question.service;

import com.codestates.stackoverflow.exception.ExceptionCode;
import com.codestates.stackoverflow.question.entity.Question;
import com.codestates.stackoverflow.exception.BusinessLoginException;
import com.codestates.stackoverflow.question.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Transactional(readOnly = true)
    public Page<Question> getQuestions(int page, int size) {
        // 전체 질문 조회 시 수정된 날짜를 기준으로 정렬
         return questionRepository.
                 findAll(PageRequest.of(page, size, Sort.Direction.DESC, "modifiedAt"));
    }

    @Transactional(readOnly = true)
    public Page<Question> searchTitle(int page, int size, String title) {
        // 전체 질문 중 Title에 title 이 포함된 데이터를 수정된 날짜를 기준으로 정렬
        return questionRepository.
                findByTitleContainingIgnoreCase(PageRequest.of(page, size, Sort.Direction.DESC, "modifiedAt"), title);
    }

    public Question getQuestion(Long id) {
        // Question의 Id 값을 기준으로 DB에 조회하며 해당 Id를 가진 Question이 없다면 QUESTION_NOT_FOUNT 예외 발생
        Question question = findverifyQuestion(id);
        question.setViewCount(question.getViewCount() + 1);

        return question;
    }

    public void deleteQuestion(Long id) {
        // Question의 Id 값을 기준으로 DB에 조회하며 해당 Id를 가진 Question이 없다면 QUESTION_NOT_FOUNT 예외 발생
        // 해당 Id를 가진 Question이 있다면 해당 질문을 삭제한다.
        Question question = findverifyQuestion(id);
//        if (authenticationMember().getMemberId() != question.getMember().getMemberId()) {
//            throw new BusinessLoginException(ExceptionCode.UNAUTHORIZED);
//        }
        questionRepository.deleteById(id);
    }


    public Question createQuestion(Question request) {
        // 동일한 Title이 있는지 검증
//        request.setMember(authenticationMember());

        verifyExistsTitle(request.getTitle());
        return questionRepository.save(request);
    }

//    private Member authenticationMember() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = (String) authentication.getPrincipal();
//        return memberSerivce.findVerifiedMember(username);
//    }

    public Question updateQuestion(Question request, Long questionId) {
        Question question = findverifyQuestion(questionId);
//        if (authenticationMember().getMemberId() != question.getMember().getMemberId()) {
//            throw new BusinessLoginException(ExceptionCode.UNAUTHORIZED);
//        }
        Optional.ofNullable(request.getTitle())
                .ifPresent(title -> question.setTitle(title));
        Optional.ofNullable(request.getContent())
                .ifPresent(content -> question.setContent(content));
        question.setViewCount(0L);
        // Question 업데이트 시 수정 시간 업데이트
        question.setModifiedAt(LocalDateTime.now());

        return questionRepository.save(question);
    }

    private void verifyExistsTitle(String title) {
        // Question의 Title 값을 기준으로 DB에 조회하며 해당 Title을 가진 Question이 없다면 QUESTION_DUPLICATED_TITLE 예외 발생
        questionRepository.findByTitle(title)
                .ifPresent(i -> {
                    throw new BusinessLoginException(ExceptionCode.QUESTION_DUPLICATED_TITLE);});
    }
    private Question findverifyQuestion(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new BusinessLoginException(ExceptionCode.QUESTION_NOT_FOUNT));
        return question;
    }

}
