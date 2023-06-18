package com.codestates.stackoverflow.answer.service;

import com.codestates.stackoverflow.answer.dto.AnswerResponseDtoForMember;
import com.codestates.stackoverflow.answer.entity.Answer;
import com.codestates.stackoverflow.answer.repository.AnswerRepository;
import com.codestates.stackoverflow.exception.BusinessLogicException;
import com.codestates.stackoverflow.exception.ExceptionCode;
import com.codestates.stackoverflow.member.entity.Member;
import com.codestates.stackoverflow.member.service.MemberService;
import com.codestates.stackoverflow.question.dto.QuestionResponseDto;
import com.codestates.stackoverflow.question.entity.Question;
import com.codestates.stackoverflow.utils.CustomBeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final CustomBeanUtils<Answer> beanUtils;

    private final MemberService memberService;

    public AnswerService(AnswerRepository answerRepository, CustomBeanUtils beanUtils, MemberService memberService) {
        this.answerRepository = answerRepository;
        this.beanUtils = beanUtils;
        this.memberService = memberService;
    }

    public Answer createAnswer(Answer answer) {
        answer.setMember(authenticationMember());
        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Answer foundAnswer = findAnswer(answer.getAnswerId());

        if (authenticationMember().getMemberId() != foundAnswer.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_ANSWER);
        }

        Answer updatedAnswer = beanUtils.copyNonNullProperties(answer, foundAnswer);

        return answerRepository.save(updatedAnswer);
    }

    public Answer findAnswer(long answerId) {
        Optional<Answer> answerOptional = answerRepository.findById(answerId);
        return answerOptional.orElseThrow(()-> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
    }

    public Page<Answer> findAnswers(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    public void deleteAnswer(long answerId) {
        Answer foundAnswer = findAnswer(answerId);

        if (authenticationMember().getMemberId() != foundAnswer.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_ANSWER);
        }

        answerRepository.delete(foundAnswer);
    }

    private Member authenticationMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //현재 로그인한 사용자 이메일
        String username = (String) authentication.getPrincipal();

        // 로그인한 ID(이매일)로 Member를 찾아서 반환
        return memberService.findVerifiedMember(username);
    }

    public List<AnswerResponseDtoForMember> getAnswerByMemberId(Long memberId) {
        List<Answer> answers = answerRepository.findByMemberMemberId(memberId);
        List<AnswerResponseDtoForMember> answerDtos = new ArrayList<>();

        for (Answer answer : answers) {
            AnswerResponseDtoForMember answerDto = new AnswerResponseDtoForMember(
                    answer.getAnswerId(),
                    answer.getContent(),
                    answer.getCreatedAt(),
                    answer.getModifiedAt()
            );
            answerDtos.add(answerDto);
        }

        return answerDtos;
    }
}
