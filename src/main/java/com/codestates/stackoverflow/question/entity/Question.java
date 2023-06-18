package com.codestates.stackoverflow.question.entity;

import com.codestates.stackoverflow.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// Question 조회 시 조회 수가 올라가 modifiedAt가 계속 변경됨
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
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    Member member;

    // Answer N:1, 양방향
//    @OneToMany(mappedBy = "question")
//    @OneToMany(mappedBy = "question",cascade = CascadeType.REMOVE)
//    List<Answer> answers = new ArrayList<>();
}
