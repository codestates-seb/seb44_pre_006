package com.codestates.stackoverflow.question.repository;

import com.codestates.stackoverflow.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findByTitle(String title);
    Page<Question> findByTitleContainingIgnoreCase(Pageable pageable, String title);
    // SELECT * FROM Question q WHERE LOWER(q.title) LIKE LOWER(CONCAT('%', :title, '%'))
}
