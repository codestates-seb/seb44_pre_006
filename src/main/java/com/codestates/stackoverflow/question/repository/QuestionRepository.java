package com.codestates.stackoverflow.question.repository;

import com.codestates.stackoverflow.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByMemberMemberId(Long memberId);
    Page<Question> findByTitleContainingIgnoreCase(Pageable pageable, String title);
    // SELECT * FROM Question q WHERE LOWER(q.title) LIKE LOWER(CONCAT('%', :title, '%'))

    @Modifying
    @Query(value = "UPDATE Question q SET q.viewCount = q.viewCount + 1 WHERE q.id = :questionId")
    void incrementViews(@Param("questionId") Long questionId);
}
