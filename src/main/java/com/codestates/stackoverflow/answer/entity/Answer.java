package com.codestates.stackoverflow.answer.entity;

import com.codestates.stackoverflow.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(nullable = false)
    private String content;

    @Column(updatable = false, nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    // Member 1:N, 양방향 / ID 추가하기
    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    Member member;

    // Question 1:N, 양방향 / ID 추가하기

}
