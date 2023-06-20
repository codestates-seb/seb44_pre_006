package com.codestates.stackoverflow.member.entity;

import com.codestates.stackoverflow.answer.entity.Answer;
import com.codestates.stackoverflow.question.entity.Question;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    // 추가
    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(updatable = false, nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createdAt = LocalDateTime.now();


    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    //Question과의 의존관계 설정
    @OneToMany(mappedBy = "member",cascade = CascadeType.REMOVE)
    @JsonIgnore
    List<Question> questions = new ArrayList<>();

    //Answer와의 의존관계 설정
    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonIgnore
    List<Answer> answers = new ArrayList<>();

    // 추가
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public Member(String email) {
        this.email = email;
    }

    public Member(String email, String name) {
        this.email = email;
        this.name = name;

    }

    public Member(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}
