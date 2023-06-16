package com.codestates.stackoverflow.member.dto;

import com.codestates.stackoverflow.question.dto.QuestionDto;
import com.codestates.stackoverflow.question.dto.QuestionResponseDto;
import com.codestates.stackoverflow.question.entity.Question;
import com.codestates.stackoverflow.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String password;

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String name;

    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long memberId;

        @NotSpace(message = "회원 이름은 공백이 아니어야 합니다")
        private String name;

        //패스워드도 수정가능하도록 함.
        @NotSpace(message = "패스워드는 공백이 아니어야 합니다.")
        private String password;

        public Patch() {

        }

        public Patch(String name, String password){
            this.name = name;
            this.password = password;
        }

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long memberId;
        private String email;
        private String name;
    }

    @AllArgsConstructor
    @Getter
    public static class InfoResponse{
        private List<QuestionResponseDto.ResponseForMember> questions;
        private List<String> answers;
    }
}
