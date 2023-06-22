package com.codestates.stackoverflow.member;

import com.codestates.stackoverflow.answer.dto.AnswerResponseDtoForMember;
import com.codestates.stackoverflow.answer.entity.Answer;
import com.codestates.stackoverflow.answer.service.AnswerService;
import com.codestates.stackoverflow.auth.dto.LoginDto;
import com.codestates.stackoverflow.auth.utils.CustomAuthorityUtils;
import com.codestates.stackoverflow.member.dto.MemberDto;
import com.codestates.stackoverflow.member.entity.Member;
import com.codestates.stackoverflow.member.mapper.MemberMapper;
import com.codestates.stackoverflow.member.repository.MemberRepository;
import com.codestates.stackoverflow.member.service.MemberService;
import com.codestates.stackoverflow.question.dto.QuestionResponseDto;
import com.codestates.stackoverflow.question.entity.Question;
import com.codestates.stackoverflow.question.service.QuestionService;
import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.constraints.ConstraintDescriptions;
import org.springframework.restdocs.headers.HeaderDocumentation;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

import static com.codestates.stackoverflow.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.codestates.stackoverflow.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
//@WebMvcTest(MemberController.class) -> Spring Security를 활설화시키지 않음.
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class MemberControllerDocumentationTestWithJwt {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomAuthorityUtils authorityUtils;

    @MockBean
    private QuestionService questionService; //추가

    @MockBean
    private AnswerService answerService; //추가

    @MockBean
    private MemberMapper mapper;

    @Test
    void postMemberTest() throws Exception {
        // given
        MemberDto.Post post = new MemberDto.Post("jeein@gmail.com", "1234", "jeein Park");
        String content = gson.toJson(post);

        given(mapper.memberPostToMember(Mockito.any(MemberDto.Post.class))).willReturn(new Member());

        Member mockResultMember= new Member();
        mockResultMember.setMemberId(1L);

        given(memberService.createMember(Mockito.any(Member.class))).willReturn(mockResultMember);


        URI uri = UriComponentsBuilder.newInstance().path("/users/signup").build().toUri();

        // when
        ResultActions actions =
                mockMvc.perform(
                                post(uri)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content));


        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/users/"))))
                .andDo(document(
                        "post-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("패스워드"),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));

    }

    @Test
    @WithMockUser(username = "jeein@gmail.com",password="1234",roles="USER")
    void loginTest() throws Exception{

        Member member = new Member("jeein@gmail.com", "1234", "jeein Park");
        member.setMemberId(1L);

        MemberService realMemberService = new MemberService(memberRepository,passwordEncoder,authorityUtils);
        realMemberService.createMember(member);
        System.out.println(realMemberService.findMember(1).getEmail());

        LoginDto loginDto = new LoginDto();
        loginDto.setUsername("jeein@gmail.com");
        loginDto.setPassword("1234");

        String content2 = gson.toJson(loginDto);

        //JWT Authorization api 추가
        String jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZ~";

        // when
        ResultActions actions =
                mockMvc.perform(
                        post("/users/login")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content2)
                                );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(header().exists(HttpHeaders.AUTHORIZATION))
                .andDo(document(
                        "login-user",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("username").type(JsonFieldType.STRING).description("아이디(이메일)"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("패스워드")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.AUTHORIZATION).description("발급된 JWT")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("회원 이름"),
                                        fieldWithPath("memberId").type(JsonFieldType.STRING).description("회원 번호")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(username = "user@gmail.com",password="1234",roles="USER")
    void patchMemberTest() throws Exception{
       //given
        long memberId = 1L;

        MemberDto.Patch patch = new MemberDto.Patch( "jeein Park", "1234");
        patch.setMemberId(1L);


        MemberDto.Response response = new MemberDto.Response(1L,
                "jeein@gmail.com",
                "jeein Park");

        given(mapper.memberPatchToMember(Mockito.any(MemberDto.Patch.class))).willReturn(new Member());

        given(memberService.updateMember(Mockito.any(Member.class))).willReturn(new Member());

        given(mapper.memberToMemberResponse(Mockito.any(Member.class))).willReturn(response);

        String content = gson.toJson(patch);

        //JWT Authorization api 추가
        String jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZ~";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwtToken);


        //when
        ResultActions actions =
                mockMvc.perform(
                                patch("/users/{member-id}",memberId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .headers(headers)
                                .content(content)
                );



        //유효성 검증에 사용된 애너테이션에 대한 정보를 추가
        ConstraintDescriptions patchMemberConstraints = new ConstraintDescriptions(MemberDto.Patch.class); // 유효성 검증 조건 정보 객체 생성

        List<String> nameDescriptions=Arrays.asList("이름은 공백이 아니어야 합니다");
        List<String> passwordDescriptions=Arrays.asList("패스워드는 공백이 아니어야 합니다");


        //then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.memberId").value(patch.getMemberId()))
                .andExpect(jsonPath("$.data.name").value(patch.getName()))
                .andDo(document("patch-member",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                List.of(parameterWithName("member-id").description("회원 식별자 ID"))
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자").ignored(),
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름")
                                                .attributes(key("constraints").value(nameDescriptions)),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("패스워드")
                                                .attributes(key("constraints").value(passwordDescriptions))
                                )
                        ),
                        requestHeaders(
                                HeaderDocumentation.headerWithName("Authorization").description("JWT Token")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터").optional(),
                                        fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("data.email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("data.name").type(JsonFieldType.STRING).description("이름")
                                )
                        )
                ));


    }

    @Test
    @WithMockUser(username = "user@gmail.com",password="1234",roles="USER")
    void getMemberTest() throws Exception {

        //given
        long memberId = 1L;
        Member member = new Member("jeein@gmail.com", "1234", "jeein Park");
        member.setMemberId(memberId);

        MemberDto.Response response = new MemberDto.Response(1L,
                "jeein@gmail.com",
                "jeein Park");

        given(memberService.findMember(Mockito.anyLong())).willReturn(new Member());
        given(mapper.memberToMemberResponse(Mockito.any(Member.class))).willReturn(response);



        String jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZ~";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwtToken);

        //when
        ResultActions actions = mockMvc.perform(
                        get("/users/{member-id}",memberId)
                        .accept(MediaType.APPLICATION_JSON)
                        .headers(headers)
        );

        //then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data.email").value(member.getEmail()))
                .andExpect(jsonPath("$.data.name").value(member.getName()))
                .andDo(
                        document("get-member",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        List.of(parameterWithName("member-id").description("회원 식별자 ID"))
                                ),
                                requestHeaders(
                                        HeaderDocumentation.headerWithName("Authorization").description("JWT Token")
                                ),
                                responseFields(
                                        List.of(
                                                fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터").optional(),
                                                fieldWithPath("data.memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                                fieldWithPath("data.email").type(JsonFieldType.STRING).description("이메일"),
                                                fieldWithPath("data.name").type(JsonFieldType.STRING).description("이름")
                                        )
                                )

                        ));
    }

    @Test
    void getMembersTest() throws Exception{
        //given
        Member member1 = new Member("jeein1@gmail.com", "jeein Park1");
        Member member2 = new Member("jeein2@gmail.com", "jeein Park2");

        Page<Member> pageMembers = new PageImpl<>(
                List.of(member1, member2),
                PageRequest.of(0, 10,
                        Sort.by("memberId").descending()),2
        );

        List<MemberDto.Response> responses = List.of(
                new MemberDto.Response(1L,
                        "jeein1@gmail.com",
                        "Jeein Park1"),
                new MemberDto.Response(2L,
                        "jeein2@gmail.com",
                        "Jeein Park2")
        );

        given(memberService.findMembers(Mockito.anyInt(), Mockito.anyInt())).willReturn(pageMembers);
        given(mapper.membersToMemberResponses(Mockito.anyList())).willReturn(responses);

        String page = "1";
        String size = "10";
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);

        URI uri = UriComponentsBuilder.newInstance().path("/users").build().toUri();


        //when
        ResultActions actions = mockMvc.perform(
                get(uri)
                        .params(queryParams)
                        .accept(MediaType.APPLICATION_JSON)

        );

        //then
        MvcResult result = actions
                .andExpect(status().isOk())
                .andDo(
                        document(
                                "get-members",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestParameters(
                                        List.of(
                                                parameterWithName("page").description("Page 번호"),
                                                parameterWithName("size").description("Page Size")
                                        )
                                ),
                                responseFields(
                                        List.of(
                                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터").optional(),
                                                fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                                fieldWithPath("data[].email").type(JsonFieldType.STRING).description("이메일"),
                                                fieldWithPath("data[].name").type(JsonFieldType.STRING).description("이름"),
                                                fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                                fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                                fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 사이즈"),
                                                fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 건 수"),
                                                fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 수")
                                        )

                                )
                        )

                )
                .andReturn();

        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.data");

        assertThat(list.size(), is(2));
    }

    @Test
    @WithMockUser(username = "user@gmail.com",password="1234",roles="USER")
    void getMemberActivities() throws Exception{
        //given
        long memberId = 1L;
        Member member = new Member("jeein@gmail.com", "1234", "jeein Park");
        member.setMemberId(memberId);

        List<Question> questions = new ArrayList<>();
        Question question1 = new Question(1L, "question1", "question1", 1L, LocalDateTime.now(), LocalDateTime.now(), member.getEmail());
        questions.add(question1);

        List<Answer> answers = new ArrayList<>();
        Answer answer1 = new Answer(1L, "answer1", member, question1);
        answer1.setCreatedAt(LocalDateTime.now());
        answer1.setModifiedAt(LocalDateTime.now());
        answer1.setCreatedBy(member.getEmail());

        answers.add(answer1);

        List<QuestionResponseDto.ResponseForMember> questionDtos = new ArrayList<>();

        for(Question question:questions){
            QuestionResponseDto.ResponseForMember questionDto = new QuestionResponseDto.ResponseForMember(
                    question.getId(),
                    question.getTitle(),
                    question.getContent(),
                    question.getCreatedAt(),
                    question.getModifiedAt(),
                    question.getViewCount(),
                    question.getCreateBy()
            );
            questionDtos.add(questionDto);
        }

        List<AnswerResponseDtoForMember> answerDtos = new ArrayList<>();

        for (Answer answer : answers) {
            AnswerResponseDtoForMember answerDto = new AnswerResponseDtoForMember(
                    answer.getAnswerId(),
                    answer.getContent(),
                    answer.getCreatedAt(),
                    answer.getModifiedAt(),
                    answer.getCreatedBy()
            );
            answerDtos.add(answerDto);
        }

        given(questionService.getQuestionByMemberId(Mockito.anyLong())).willReturn(questionDtos);
        given(answerService.getAnswerByMemberId(Mockito.anyLong())).willReturn(answerDtos);

        MemberDto.InfoResponse infoResponse = new MemberDto.InfoResponse(questionDtos, answerDtos);


        String jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZ~";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwtToken);

        //when
        ResultActions actions = mockMvc.perform(
                get("/users/getInfo/{member-id}",memberId)
                        .accept(MediaType.APPLICATION_JSON)
                        .headers(headers)
        );

        //then
        MvcResult result = actions
                .andExpect(status().isFound())
                .andDo(
                        document(
                                "get-memberInfo",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        List.of(parameterWithName("member-id").description("회원 식별자 ID"))
                                ),
                                responseFields(
                                        List.of(
                                                fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과데이터").optional(),
                                                fieldWithPath("data.questions").type(JsonFieldType.ARRAY).description("작성한 질문").optional(),
                                                fieldWithPath("data.questions[].id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                                fieldWithPath("data.questions[].title").type(JsonFieldType.STRING).description("이메일"),
                                                fieldWithPath("data.questions[].content").type(JsonFieldType.STRING).description("제목"),
                                                fieldWithPath("data.questions[].createdAt").type(JsonFieldType.STRING).description("생성날짜"),
                                                fieldWithPath("data.questions[].modifiedAt").type(JsonFieldType.STRING).description("수정날짜"),
                                                fieldWithPath("data.questions[].viewCount").type(JsonFieldType.NUMBER).description("조회수"),
                                                fieldWithPath("data.questions[].createdBy").type(JsonFieldType.STRING).description("작성자"),
                                                fieldWithPath("data.answers").type(JsonFieldType.ARRAY).description("작성한 답변").optional(),
                                                fieldWithPath("data.answers[].answerId").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                                fieldWithPath("data.answers[].content").type(JsonFieldType.STRING).description("내용"),
                                                fieldWithPath("data.answers[].createdAt").type(JsonFieldType.STRING).description("생성날짜"),
                                                fieldWithPath("data.answers[].modifiedAt").type(JsonFieldType.STRING).description("수정날짜"),
                                                fieldWithPath("data.answers[].createdBy").type(JsonFieldType.STRING).description("작성자")

                                        )

                                )
                        )

                )
                .andReturn();

        LinkedHashMap list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.data");

        assertThat(list.size(), is(2));
    }

    @Test
    @WithMockUser(username = "user@gmail.com",password="1234",roles="USER")
    void deleteMemberTest() throws Exception{
        //given
        long memberId = 1L;

        doNothing().when(memberService).deleteMember(memberId);

        String jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZ~";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwtToken);

        //when
        ResultActions actions = mockMvc.perform(delete("/users/{member-id}",memberId).headers(headers));

        //then
        actions.andExpect(status().isNoContent())
                .andDo(
                        document(
                                "delete-member",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        Arrays.asList(parameterWithName("member-id").description("회원 식별자 ID"))
                                ),
                                requestHeaders(
                                        HeaderDocumentation.headerWithName("Authorization").description("JWT Token")
                                )
                        )
                );
    }

    @Test
    @WithMockUser(username = "user@gmail.com",password="1234",roles="ADMIN")
    void deleteMembersTest() throws Exception{

        //given
        doNothing().when(memberService).deleteAll();

        String jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZ~";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwtToken);

        //when
        ResultActions actions = mockMvc.perform(delete("/users").headers(headers));

        //then
        actions.andExpect(status().isNoContent())
                .andDo(
                        document(
                                "delete-members",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestHeaders(
                                        HeaderDocumentation.headerWithName("Authorization").description("JWT Token")
                                )
                        )
                );
    }
}