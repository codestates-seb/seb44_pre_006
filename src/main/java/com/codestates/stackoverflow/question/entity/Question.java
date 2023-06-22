package com.codestates.stackoverflow.question.entity;

import com.codestates.stackoverflow.answer.entity.Answer;
import com.codestates.stackoverflow.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "VIEWCOUNT", nullable = false)
    private Long viewCount = 0L;

    @Column(updatable = false, nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    // Member 1:N, 양방향
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    // Answer N:1, 양방향
    @OneToMany(mappedBy = "question",cascade = CascadeType.REMOVE)
    private List<Answer> answers = new ArrayList<>();


    public Question(Long id, String title, String content, Long viewCount, LocalDateTime createdAt, LocalDateTime modifiedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.viewCount = viewCount;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
