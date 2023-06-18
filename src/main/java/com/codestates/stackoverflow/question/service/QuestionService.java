package com.codestates.stackoverflow.question.service;

import com.codestates.stackoverflow.exception.BusinessLogicException;
import com.codestates.stackoverflow.exception.ExceptionCode;
import com.codestates.stackoverflow.member.entity.Member;
import com.codestates.stackoverflow.member.service.MemberService;
import com.codestates.stackoverflow.question.dto.QuestionResponseDto;
import com.codestates.stackoverflow.question.entity.Question;
import com.codestates.stackoverflow.question.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private MemberService memberService;

    //로그인한 회원 질문 등록
    public Question createQuestion(Question request) {
        // 로그인한 사용자의 ID로 조회하여 해당 ID를 가진 사람이 존재하는 검증
        request.setMember(authenticationMember());

        return questionRepository.save(request);
    }

    //질문 수정
    public Question updateQuestion(Question request, Long questionId) {
        // Question의 Id 값을 기준으로 DB에 조회하며 해당 Id를 가진 Question이 없다면 QUESTION_NOT_FOUNT 예외 발생
        Question question = findverifyQuestion(questionId);

        // 로그인한 사용자의 ID로 조회하여 해당 ID를 가진 사용자와 질문을 작성한 사용자가 같은지 확인
        if (authenticationMember().getMemberId() != question.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.QUESTION_UNAUTHORIZED);
        }

        Optional.ofNullable(request.getTitle())
                .ifPresent(title -> question.setTitle(title));
        Optional.ofNullable(request.getContent())
                .ifPresent(content -> question.setContent(content));
        question.setViewCount(0L);

        // Question 업데이트 시 수정 시간 업데이트
        question.setModifiedAt(LocalDateTime.now());

        return questionRepository.save(question);
    }

    //질문 아이디로 질문 1개 조회
    public Question getQuestion(Long id) {
        // Question의 Id 값을 기준으로 DB에 조회하며 해당 Id를 가진 Question이 없다면 QUESTION_NOT_FOUNT 예외 발생
        Question question = findverifyQuestion(id);
        question.setViewCount(question.getViewCount() + 1);

        return question;
    }

    //회원 아이디로 등록한 질문들 찾기
    public List<QuestionResponseDto.ResponseForMember> getQuestionByMemberId(Long memberId){
        List<Question> questions = questionRepository.findByMemberMemberId(memberId);
        List<QuestionResponseDto.ResponseForMember> questionDtos = new ArrayList<>();

        for (Question question : questions) {
            QuestionResponseDto.ResponseForMember questionDto = new QuestionResponseDto.ResponseForMember(
                    question.getId(),
                    question.getTitle(),
                    question.getContent(),
                    question.getCreatedAt(),
                    question.getModifiedAt(),
                    question.getViewCount()
            );
            questionDtos.add(questionDto);
        }

        return questionDtos;
    }


    //전체 질문 목록
    @Transactional(readOnly = true)
    public Page<Question> getQuestions(int page, int size) {
        // 전체 질문 조회 시 수정된 날짜를 기준으로 정렬
        return questionRepository.
                findAll(PageRequest.of(page, size, Sort.Direction.DESC, "modifiedAt"));
    }

    //제목으로 질문 조회
    @Transactional(readOnly = true)
    public Page<Question> searchTitle(int page, int size, String title) {
        // 전체 질문 중 Title에 title 이 포함된 데이터를 수정된 날짜를 기준으로 정렬
        return questionRepository.
                findByTitleContainingIgnoreCase(PageRequest.of(page, size, Sort.Direction.DESC, "modifiedAt"), title);
    }

    //질문 작성자 질문 삭제
    public void deleteQuestion(Long id) {
        // Question의 Id 값을 기준으로 DB에 조회하며 해당 Id를 가진 Question이 없다면 QUESTION_NOT_FOUNT 예외 발생
        Question question = findverifyQuestion(id);

        // 로그인한 사용자의 ID로 조회하여 해당 ID를 가진 사용자와 질문을 작성한 사용자가 같은지 확인
        if (authenticationMember().getMemberId() != question.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.QUESTION_UNAUTHORIZED);
        }
        questionRepository.deleteById(id);
    }

    //등록된 사용자인지 확인
    private Member authenticationMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //현재 로그인한 사용자 이메일
        String username = (String) authentication.getPrincipal();

        // 로그인한 ID(이매일)로 Member를 찾아서 반환
        return memberService.findVerifiedMember(username);
    }

    //등록된 질문 리턴
    private Question findverifyQuestion(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return question;
    }

}