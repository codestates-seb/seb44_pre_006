package com.codestates.stackoverflow.answer.service;

import com.codestates.stackoverflow.answer.entity.Answer;
import com.codestates.stackoverflow.answer.repository.AnswerRepository;
import com.codestates.stackoverflow.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final CustomBeanUtils<Answer> beanUtils;

    public AnswerService(AnswerRepository answerRepository, CustomBeanUtils beanUtils) {
        this.answerRepository = answerRepository;
        this.beanUtils = beanUtils;
    }

    public Answer createAnswer(Answer answer) {

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Answer foundAnswer = findAnswer(answer.getAnswerId());
        Answer updatedAnswer = beanUtils.copyNonNullProperties(answer, foundAnswer);

        return answerRepository.save(updatedAnswer);
    }

    public Answer findAnswer(long answerId) {
        Optional<Answer> answerOptional = answerRepository.findById(answerId);
        return answerOptional.orElse(null);
    }

    public List<Answer> findAnswers() {

        return answerRepository.findAll();
    }

    public void deleteAnswer(long answerId) {
        Answer foundAnswer = findAnswer(answerId);
        answerRepository.delete(foundAnswer);
    }
}
