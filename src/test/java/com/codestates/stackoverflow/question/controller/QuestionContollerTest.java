package com.codestates.stackoverflow.question.controller;

import com.codestates.stackoverflow.answer.dto.AnswerResponseDto;
import com.codestates.stackoverflow.question.dto.QuestionDto;
import com.codestates.stackoverflow.question.dto.QuestionResponseDto;
import com.codestates.stackoverflow.question.entity.Question;
import com.codestates.stackoverflow.question.mapper.QuestionMapper;
import com.codestates.stackoverflow.question.repository.QuestionRepository;
import com.codestates.stackoverflow.question.service.QuestionService;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
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
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.codestates.stackoverflow.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.codestates.stackoverflow.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@WebMvcTest(QuestionContoller.class)
@SpringBootTest
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc
class QuestionContollerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private QuestionService questionService;
    @MockBean
    private QuestionRepository questionRepository;
    @MockBean
    private QuestionMapper mapper;

    Page<Question> mockPage;
    List<QuestionResponseDto.Response> multiquestion;
    Question question;
    QuestionResponseDto.ResponseDetail response;

    @BeforeEach
    void beforeEach(TestInfo testInfo) {
        String str = testInfo.getTestMethod().orElse(null).getName();
        if (str.equals("searchQuestions") || str.equals("getQuestions")) {
            // searchQuestions, getQuestions 테스트 메서드에 대한 전처리 작업 수행
            this.mockPage = new PageImpl<>(
                    Arrays.asList(
                            new Question(1L, "Title", "Content", 0L, LocalDateTime.now().withNano(0), LocalDateTime.now().withNano(0), "user@gmail.com",null, null),
                            new Question(2L, "Title1", "Content1", 0L, LocalDateTime.now().withNano(0), LocalDateTime.now().withNano(0),"user@gmail.com", null, null)),
                    PageRequest.of(0, 10, Sort.Direction.DESC, "modifiedAt"), 2
            );

            this.multiquestion = mockPage.getContent()
                    .stream()
                    .map(i -> QuestionResponseDto.Response.builder()
                            .title(i.getTitle())
                            .content(i.getContent())
                            .viewCount(i.getViewCount())
                            .answerCount(0)
                            .modifiedAt(LocalDateTime.now().withNano(0))
                            .createBy("user@gamil.com")
                            .build())
                    .collect(Collectors.toList());
        } else if (str.equals("getQuestion") || str.equals("patchQuestion") || str.equals("createQuestion")) {
            // getQuestion, patchQuestion, createQuestion 테스트 메서드에 대한 전처리 작업 수행
            this.question = new Question(1L, "Title", "Content", 0L, LocalDateTime.now().withNano(0), LocalDateTime.now().withNano(0),"user@gmail.com", null, null);

            System.out.println("question : " + question);
            this.response = QuestionResponseDto.ResponseDetail.builder()
                    .id(question.getId())
                    .title(question.getTitle())
                    .content(question.getContent())
                    .viewCount(0L)
                    .createdAt(question.getCreatedAt())
                    .modifiedAt(question.getModifiedAt())
                    .createBy("user@gmail.com")
                    .answers(new ArrayList<>()).build();
            response.getAnswers().add(new AnswerResponseDto(1L, "body", LocalDateTime.now().withNano(0), LocalDateTime.now().withNano(0), "kevin@gmail.com"));
        }
    }


    @Test
    @DisplayName("getQuestions Test")
    void getQuestions() throws Exception {
        // given
        given(questionService.getQuestions(Mockito.anyInt(), Mockito.anyInt()))
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
                                        fieldWithPath("data[].createBy").type(JsonFieldType.STRING).description("질문 작성자"),
                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지 번호"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 사이즈"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 질문 갯수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 수")
                                )
                        )));
    }


    @Test
    @DisplayName("searchQuestions Test")
    void searchQuestions() throws Exception {
        // given
        given(questionService.searchTitle(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyString()))
                .willReturn(mockPage);
        given(mapper.questionsToResponses((Mockito.anyList())))
                .willReturn(multiquestion);


        // when
        ResultActions actions = mockMvc.perform(
                get("/questions/search")
                        .param("size", "10")
                        .param("page", "1")
                        .param("title", "Title")
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andDo(document(
                        "get-search",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestParameters(
                                List.of(
                                    parameterWithName("page").description("페이지 번호"),
                                    parameterWithName("size").description("페이지 크기"),
                                    parameterWithName("title").description("찾을 질문 제목")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("질문 리스트"),
                                        fieldWithPath("data[].title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("data[].content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("질문 수정 시간"),
                                        fieldWithPath("data[].viewCount").type(JsonFieldType.NUMBER).description("질문 조회 수"),
                                        fieldWithPath("data[].answerCount").type(JsonFieldType.NUMBER).description("질문에 대한 답변 개수"),
                                        fieldWithPath("data[].createBy").type(JsonFieldType.STRING).description("질문 작성자"),
                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지 번호"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 사이즈"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 질문 갯수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 수")
                                )
                        )));
    }

    @Test
    @DisplayName("getQuestion Test")
    void getQuestion() throws Exception {
        // given
        given(mapper.questionToDetail(Mockito.any(Question.class)))
                .willReturn(response);
        given(questionService.getQuestion(Mockito.anyLong()))
                .willReturn(question);
        // when
        ResultActions actions = mockMvc.perform(
                get("/questions/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andDo(print())
                .andExpect(status().isOk())
                .andDo(document(
                        "get-question",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("id").description("질문 식별자 ID")
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
                                        fieldWithPath("data.createBy").type(JsonFieldType.STRING).description("질문 작성자"),
                                        fieldWithPath("data.answers").type(JsonFieldType.ARRAY).description("질문에 대한 답변 리스트"),
                                        fieldWithPath("data.answers[].answerId").type(JsonFieldType.NUMBER).description("답변 식별자 ID"),
                                        fieldWithPath("data.answers[].content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("data.answers[].createdAt").type(JsonFieldType.STRING).description("답변 생성 날짜"),
                                        fieldWithPath("data.answers[].modifiedAt").type(JsonFieldType.STRING).description("답변 수정 날짜"),
                                        fieldWithPath("data.answers[].createdBy").type(JsonFieldType.STRING).description("답변 작성자")
                                )
                        )));
    }

    @Test
    @DisplayName("createQuestion Test")
    @WithMockUser(username = "user@gmail.com",password="1234",roles="USER")
    void createQuestion() throws Exception {
        // given
        String str = createJson();

        given(mapper.requestToQuestion(Mockito.any(QuestionDto.PostRequest.class)))
                .willReturn(question);
        given(questionService.createQuestion(Mockito.any(Question.class)))
                .willReturn(question);

        // when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders.post("/questions/ask")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(str));

        // then
        actions.andExpect(status().isCreated())
                .andExpect(header().string("Location", "/questions/1"))
                .andDo(print())
                .andDo(document(
                        "post-question",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("등록된 질문의 URI. /question/{questionId}")
                        )
                ));
    }

    @Test
    @DisplayName("patchQuestion Test")
    @WithMockUser(username = "user@gmail.com",password="1234",roles="USER")
    void patchQuestion() throws Exception {
        // given
        String str = createJson();

        given(mapper.requestToQuestion(Mockito.any(QuestionDto.PostRequest.class)))
                .willReturn(question);
        given(questionService.updateQuestion(Mockito.any(Question.class), Mockito.anyLong()))
                .willReturn(question);
        given(questionRepository.findById(Mockito.anyLong()))
                .willReturn((Optional.ofNullable(question)));
        given(mapper.questionToDetail(Mockito.any(Question.class)))
                .willReturn(response);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/questions/posts/{question-id}/edit", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(str));

        // then
        actions.andExpect(status().isSeeOther())
                .andDo(document(
                        "patch-question",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용")
                                )
                        ),
                        pathParameters(
                                parameterWithName("question-id").description("질문 식별자 ID")
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("리다이렉트 URL /question/{questionId}")
                        )));
    }

    @Test
    @DisplayName("deleteQuestion Test")
    @WithMockUser(username = "user@gmail.com",password="1234",roles="USER")
    void deleteQuestion() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                delete("/questions/{question-id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isNoContent())
                .andDo(document(
                        "delete-question",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("question-id").description("질문 식별자 ID")
                        )));
    }


    private String createJson() {
        Map<String, String> map = new HashMap<>();
        map.put("title", "hello");
        map.put("content", "Hello World!");
        return gson.toJson(map);
    }
}