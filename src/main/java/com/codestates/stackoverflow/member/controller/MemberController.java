package com.codestates.stackoverflow.member.controller;

import com.codestates.stackoverflow.answer.dto.AnswerResponseDtoForMember;
import com.codestates.stackoverflow.answer.service.AnswerService;
import com.codestates.stackoverflow.dto.MultiResponseDto;
import com.codestates.stackoverflow.dto.MultiResponseDtoWithOutPage;
import com.codestates.stackoverflow.dto.SingleResponseDto;
import com.codestates.stackoverflow.member.dto.MemberDto;
import com.codestates.stackoverflow.member.entity.Member;
import com.codestates.stackoverflow.member.mapper.MemberMapper;
import com.codestates.stackoverflow.member.service.MemberService;
import com.codestates.stackoverflow.question.dto.QuestionResponseDto;
import com.codestates.stackoverflow.question.service.QuestionService;
import com.codestates.stackoverflow.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * - DI 적용
 * - Mapstruct Mapper 적용
 * - @ExceptionHandler 적용
 */
@RestController
@RequestMapping("/users")
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/users";
    private final MemberService memberService;
    private final QuestionService questionService;
    private final AnswerService answerService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, QuestionService questionService, AnswerService answerService, MemberMapper mapper) {
        this.memberService = memberService;
        this.questionService = questionService;
        this.answerService = answerService;
        this.mapper = mapper;
    }

    //회원 가입
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    //회원 정보 수정
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive long memberId,
            @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);


        Member member =
                memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member)),
                HttpStatus.OK);
    }

    //회원 등록 정보 조회
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
            @PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member))
                , HttpStatus.OK);
    }

    //전체 회원 정보 조회
    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findMembers(page - 1, size);
        List<Member> members = pageMembers.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.membersToMemberResponses(members),
                        pageMembers),
                HttpStatus.OK);
    }

    //회원 정보 조회 - 현재 로그인한 member의 question 정보, answer 정보 가져오기
    @GetMapping("/getInfo/{member-id}")
    public ResponseEntity getMemberActivities(@PathVariable("member-id") @Positive long memberId) {
        //Question 정보
        List<QuestionResponseDto.ResponseForMember> questions= questionService.getQuestionByMemberId(memberId);
        //Answer 정보
        List<AnswerResponseDtoForMember> answers = answerService.getAnswerByMemberId(memberId);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("questions", questions);
        responseData.put("answers", answers);

        return new ResponseEntity<>(
                new MultiResponseDtoWithOutPage<>(responseData),
                HttpStatus.FOUND
        );

    }

    //회원 탈퇴
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(
            @PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //전체 회원 삭제
    @DeleteMapping
    public ResponseEntity deleteMembers(){
        memberService.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
