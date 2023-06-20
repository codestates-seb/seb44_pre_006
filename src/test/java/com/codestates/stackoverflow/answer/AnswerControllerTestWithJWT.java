package com.codestates.stackoverflow.answer;

import com.codestates.stackoverflow.answer.dto.AnswerPatchDto;
import com.codestates.stackoverflow.answer.dto.AnswerPostDto;
import com.codestates.stackoverflow.answer.dto.AnswerResponseDto;
import com.codestates.stackoverflow.answer.entity.Answer;
import com.codestates.stackoverflow.answer.mapper.AnswerMapper;
import com.codestates.stackoverflow.answer.service.AnswerService;
import com.codestates.stackoverflow.member.dto.MemberDto;
import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.headers.HeaderDocumentation;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.codestates.stackoverflow.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.codestates.stackoverflow.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
//@WebMvcTest(MemberController.class) -> Spring Security를 활설화시키지 않음.
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureMockMvc
@AutoConfigureRestDocs
public class AnswerControllerTestWithJWT {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;

    @MockBean
    private AnswerService answerService;

    @MockBean
    private AnswerMapper mapper;


//    private String createJson() {
//        Map<String, String> map = new HashMap<>();
//        map.put("title", "hello");
//        map.put("content", "Hello World!");
//        return gson.toJson(map);
//    }

    @Test
    @WithMockUser(username = "user@gmail.com",password="1234",roles="USER")
    void postAnswerTest() throws Exception {
        // given
        AnswerPostDto post = new AnswerPostDto("answer1");
        String content = gson.toJson(post);

        Answer answer = new Answer();
        answer.setAnswerId(1L);

//        Long questionId = post.getQuestionId();

        given(mapper.answerPostDtoToAnswer(Mockito.any(AnswerPostDto.class)))
                .willReturn(answer);

        given(answerService.createAnswer(Mockito.any(Answer.class), Mockito.anyLong())).willReturn(answer);

        //JWT Authorization api 추가
        String jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZ~";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwtToken);


        // when
        ResultActions actions =
                mockMvc.perform(
                        post("/answers/{question-id}",1L)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .headers(headers)
                                .content(content));


        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/answers/"))))
                .andDo(document(
                        "post-answer",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("question-id").description("질문 식별자 ID")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용")
//                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 번호")
                                )
                        ),
                        requestHeaders(
                                HeaderDocumentation.headerWithName("Authorization").description("JWT Token")
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));

    }

    @Test
    @WithMockUser(username = "user@gmail.com",password="1234",roles="USER")
    void patchAnswerTest() throws Exception {
        // given
        long answerId = 1L;
        AnswerPatchDto patch = new AnswerPatchDto(answerId, "answer1");

        String content = gson.toJson(patch);

        AnswerResponseDto response = new AnswerResponseDto(1L, "answer1", LocalDateTime.now(), LocalDateTime.now(), "a@gmail.com");

        given(mapper.answerPatchDtoToAnswer(Mockito.any(AnswerPatchDto.class))).willReturn(new Answer());
        given(answerService.updateAnswer(Mockito.any(Answer.class))).willReturn(new Answer());
        given(mapper.answerToAnswerResponseDto(Mockito.any(Answer.class))).willReturn(response);


        //JWT Authorization api 추가
        String jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZ~";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwtToken);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/answers/{answer-id}", answerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .headers(headers)
                        .content(content));



        // then
        actions.andExpect(status().isOk())
                .andDo(document(
                        "patch-answer",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("answer-id").description("답변 식별자 ID")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("answerId").type(JsonFieldType.STRING).description("답변 식별자").ignored(),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용")
                                )
                        ),
                        requestHeaders(
                                HeaderDocumentation.headerWithName("Authorization").description("JWT Token")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("답변 리스트"),
                                        fieldWithPath("data.answerId").type(JsonFieldType.NUMBER).description("답변 식별자 ID"),
                                        fieldWithPath("data.content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("답변 생성 시간"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("답변 수정 시간"),
                                        fieldWithPath("data.createdBy").type(JsonFieldType.STRING).description("답변 작성자")

                                )
                        )));
    }

    @Test
    void getAnswerTest() throws Exception {

        //given
        Long answerId = 1L;
        AnswerResponseDto response = new AnswerResponseDto(answerId, "answer1", LocalDateTime.now(), LocalDateTime.now(), "a@gmail.com");

        given(answerService.findAnswer(Mockito.anyLong())).willReturn(new Answer());
        given(mapper.answerToAnswerResponseDto(Mockito.any(Answer.class))).willReturn(response);

        // when
        ResultActions actions = mockMvc.perform(
                get("/answers/{answer-id}", answerId)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andDo(print())
                .andExpect(status().isOk())
                .andDo(document(
                        "get-answer",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("answer-id").description("답변 식별자 ID")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("답변 내용"),
                                        fieldWithPath("data.answerId").type(JsonFieldType.NUMBER).description("답변 식별자 ID"),
                                        fieldWithPath("data.content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("답변 생성 시간"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("답변 수정 시간"),
                                        fieldWithPath("data.createdBy").type(JsonFieldType.STRING).description("답변 작성자")
                                )
                        )));
    }


    @Test
    @DisplayName("getAnswers Test")
    void getAnswersTest() throws Exception {

        Page<Answer> pageAnswers = new PageImpl<>(
                List.of(new Answer(), new Answer()),
                PageRequest.of(0, 10,
                        Sort.by("answerId").descending()), 2
        );

        List<AnswerResponseDto> responses = List.of(
                new AnswerResponseDto(1L, "answer1", LocalDateTime.now(), LocalDateTime.now(), "a@gmail.com"),
                new AnswerResponseDto(2L, "answer2", LocalDateTime.now(), LocalDateTime.now(), "b@gmail.com")
        );

        // given
        given(answerService.findAnswers(Mockito.anyInt(), Mockito.anyInt()))
                .willReturn(pageAnswers);
        given(mapper.answersToAnswerResponseDtos((Mockito.anyList())))
                .willReturn(responses);

        String page = "1";
        String size = "10";
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);

        // when
        ResultActions actions = mockMvc.perform(
                get("/answers")
                        .params(queryParams)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andDo(document(
                        "get-answers",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 크기")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("답변 리스트"),
                                        fieldWithPath("data[].answerId").type(JsonFieldType.NUMBER).description("답변 식별자 ID"),
                                        fieldWithPath("data[].content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("답변 생성 시간"),
                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("답변 수정 시간"),
                                        fieldWithPath("data[].createdBy").type(JsonFieldType.STRING).description("답변 작성자"),
                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지 번호"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 사이즈"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 질문 갯수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 수")
                                )
                        )));
    }

    @Test
    @WithMockUser(username = "user@gmail.com", password = "1234", roles = "USER")
    void deleteAnswerTest() throws Exception {
        // given
        long answerId = 1L;
        doNothing().when(answerService).deleteAnswer(answerId);

        String jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZ~";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwtToken);

        // when
        ResultActions actions = mockMvc.perform(
                delete("/answers/{answer-id}", 1L)
                        .headers(headers)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isNoContent())
                .andDo(document(
                        "delete-answer",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("answer-id").description("답변 식별자 ID")
                        ),
                        requestHeaders(
                                HeaderDocumentation.headerWithName("Authorization").description("JWT Token")
                        )
                ));
    }
}
