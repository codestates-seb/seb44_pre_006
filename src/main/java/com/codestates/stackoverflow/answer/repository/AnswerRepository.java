package com.codestates.stackoverflow.answer.repository;

import com.codestates.stackoverflow.answer.entity.Answer;
import com.codestates.stackoverflow.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByMemberMemberId(Long memberId);

}
