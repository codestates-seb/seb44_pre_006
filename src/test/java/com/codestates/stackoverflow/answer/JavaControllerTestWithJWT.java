package com.codestates.stackoverflow.answer;

import com.codestates.stackoverflow.answer.dto.AnswerPatchDto;
import com.codestates.stackoverflow.answer.dto.AnswerPostDto;
import com.codestates.stackoverflow.answer.entity.Answer;
import com.codestates.stackoverflow.answer.mapper.AnswerMapper;
import com.codestates.stackoverflow.answer.service.AnswerService;
import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.codestates.stackoverflow.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.codestates.stackoverflow.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
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
public class JavaControllerTestWithJWT {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;

    @MockBean
    private AnswerService answerService;

    @MockBean
    private AnswerMapper mapper;



    private String createJson() {
        Map<String, String> map = new HashMap<>();
        map.put("title", "hello");
        map.put("content", "Hello World!");
        return gson.toJson(map);
    }

    @Test
    @DisplayName("postAnswer Test")
    void postAnswerTest() throws Exception {
        // given
        String content = createJson();

        given(mapper.answerPostDtoToAnswer(Mockito.any(AnswerPostDto.class)))
                .willReturn(new Answer());

        Answer mockResultAnswer = new Answer();
        mockResultAnswer.setAnswerId(1L);

        given(answerService.createAnswer(Mockito.any(Answer.class), Mockito.anyLong())).willReturn(mockResultAnswer);

        URI uri = UriComponentsBuilder.newInstance().path("/answers/post").build().toUri();

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
                .andExpect(header().string("Location", is(startsWith("/answers/1"))))
                .andDo(document(
                        "post-answer",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));

    }

    @Test
    @DisplayName("patchAnswer Test")
    void patchAnswerTest() throws Exception {
        // given
        String str = createJson();

        given(mapper.answerPatchDtoToAnswer(Mockito.any(AnswerPatchDto.class)))
                .willReturn(answer);
        given(answerService.updateAnswer(Mockito.any(Answer.class), Mockito.anyLong()))
                .willReturn(answer);
        given(mapper.answerToAnswerResponseDto(Mockito.any(Answer.class)))
                .willReturn(response);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/answers/{answerid}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(str));

        // then
        actions.andExpect(status().isOk())
                .andDo(document(
                        "patch-answer",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용")
                                )
                        ),
                        pathParameters(
                                parameterWithName("id").description("답변 식별자 ID")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("질문 리스트"),
                                        fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("답변 식별자 ID"),
                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("data.content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("답변 생성 시간"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("답변 수정 시간"),
                                        fieldWithPath("data.viewCount").type(JsonFieldType.NUMBER).description("질문 조회 수"),
                                        fieldWithPath("data.answers").type(JsonFieldType.ARRAY).description("질문에 대한 답변 리스트"),
                                        fieldWithPath("data.answers[].answerId").type(JsonFieldType.NUMBER).description("답변 식별자 ID"),
                                        fieldWithPath("data.answers[].body").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("data.answers[].createdAt").type(JsonFieldType.STRING).description("답변 생성 날짜"),
                                        fieldWithPath("data.answers[].modifiedAt").type(JsonFieldType.STRING).description("답변 수정 날짜")
                                )
                        )));
    }

    @Test
    @DisplayName("getAnswer Test")
    void getAnswerTest() throws Exception {
        // given
        given(mapper.answerToAnswerResponseDto(Mockito.any(Answer.class)))
                .willReturn(response);
        given(answerService.getAnswer(Mockito.anyLong()))
                .willReturn(answer);
        // when
        ResultActions actions = mockMvc.perform(
                get("/answers/{answerId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andDo(print())
                .andExpect(status().isOk())
                .andDo(document(
                        "get-action",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("answerId").description("답변 식별자 ID")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("질문 리스트"),
                                        fieldWithPath("data.id").type(JsonFieldType.NUMBER).description("질문 식별자 ID"),
                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("data.content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("질문 생성 시간"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("질문 수정 시간"),
                                        fieldWithPath("data.viewCount").type(JsonFieldType.NUMBER).description("질문 조회 수"),
                                        fieldWithPath("data.answers").type(JsonFieldType.ARRAY).description("질문에 대한 답변 리스트"),
                                        fieldWithPath("data.answers[].answerId").type(JsonFieldType.NUMBER).description("답변 식별자 ID"),
                                        fieldWithPath("data.answers[].body").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("data.answers[].createdAt").type(JsonFieldType.STRING).description("답변 생성 날짜"),
                                        fieldWithPath("data.answers[].modifiedAt").type(JsonFieldType.STRING).description("답변 수정 날짜")
                                )
                        )));
    }

}

    @Test
    @DisplayName("getAnswers Test")
    void getAnswersTest() throws Exception {

        // given
        given(answerService.getAnswers(Mockito.anyInt(), Mockito.anyInt()))
                .willReturn(mockPage);
        given(mapper.questionsToResponses((Mockito.anyList())))
                .willReturn(multiquestion);


        // when
        ResultActions actions = mockMvc.perform(
                get("/questions")
                        .param("size", "10")
                        .param("page", "1")
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andDo(document(
                        "get-questions",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                parameterWithName("page").description("페이지 번호"),
                                parameterWithName("size").description("페이지 크기")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("질문 리스트"),
                                        fieldWithPath("data[].title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("data[].content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("질문 수정 시간"),
                                        fieldWithPath("data[].viewCount").type(JsonFieldType.NUMBER).description("질문 조회 수"),
                                        fieldWithPath("data[].answerCount").type(JsonFieldType.NUMBER).description("질문에 대한 답변 개수"),
                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지 번호"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 사이즈"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 질문 갯수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 수")
                                )
                        )));
    }



    @Test
    @DisplayName("deleteAnswer Test")
    @WithMockUser(username = "user@gmail.com", password = "1234", roles = "USSER")
    void deleteAnswerTest() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                delete("/answers/{answer-id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isNoContent())
                .andDo(document(
                        "delete-answer",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("answer-id").description("답변 식별자 ID")
                        )));
    }
}
