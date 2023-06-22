package com.codestates.stackoverflow.answer.entity;

import com.codestates.stackoverflow.audit.Auditable;
import com.codestates.stackoverflow.member.entity.Member;
import lombok.AllArgsConstructor;
import com.codestates.stackoverflow.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(nullable = false)
    private String content;

//    @Column(updatable = false, nullable = false, columnDefinition = "DATETIME(0)")
//    private LocalDateTime createdAt = LocalDateTime.now();
//
//    @Column(nullable = false, columnDefinition = "DATETIME(0)")
//    private LocalDateTime modifiedAt = LocalDateTime.now();

    // Member 1:N, 양방향 / ID 추가하기
    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;

    // Question 1:N, 양방향 / ID 추가하기
    @ManyToOne
    @JoinColumn(name="QUESTION_ID")
    private Question question;


}
