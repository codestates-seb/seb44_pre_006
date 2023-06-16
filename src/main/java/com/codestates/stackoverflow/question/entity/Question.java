package com.codestates.stackoverflow.question.entity;

import com.codestates.stackoverflow.answer.entity.Answer;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
//@Builder
@NoArgsConstructor
@AllArgsConstructor
// Question 조회 시 조회 수가 올라가 modifiedAt가 계속 변경
//public class Question extends AuditTable {
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 150, unique = true)
    private String title;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
    @Column(nullable = false)
    private Long viewCount = 0L;
    @Column(updatable = false, nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime modifiedAt = LocalDateTime.now();
    // Member 1:N, 양방향
//    @ManyToOne
//    @Column(name = "MEMBER_ID")
//    Member member;

    // Answer N:1, 양방향
//    @OneToMany(mappedBy = "question")
    @OneToMany(mappedBy = "question",cascade = CascadeType.REMOVE)
    List<Answer> answers = new ArrayList<>();
}
