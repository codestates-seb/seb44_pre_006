<br/>

<div  align="center">
  <img width="80%" src="https://content.presspage.com/uploads/2658/c1920_logo-stackoverflow-banner.jpg?64224" alt="roobits">
</div>

</br>

- **팀 명 :** 🌙 낭만코더 
- **프로젝트 명 :** Stackoverflow
- **프로젝트 기간 :** 2023.06.9 - 2023.06.27
- **배포링크 :** [✈︎ 배포링크](http://mytodoawsbucket.s3-website.ap-northeast-2.amazonaws.com)
- **노션링크 :** [✈︎ 노션 바로가기](https://www.notion.so/codestates/5bc39b81d1eb40068f77fd253580350)

<br/>

## 🌟 팀 소개

| ![한원영](https://avatars.githubusercontent.com/u/85989215?v=4) | ![김형일](https://avatars.githubusercontent.com/u/124700383?v=4) | ![이지효](https://avatars.githubusercontent.com/u/91511828?v=4) | ![박지인](https://avatars.githubusercontent.com/u/96341808?v=4) | ![김어진](https://avatars.githubusercontent.com/u/124785394?v=4) | ![이지윤](https://avatars.githubusercontent.com/u/121713161?v=4) | ![최서우](https://avatars.githubusercontent.com/u/119303663?v=4) |
| :-------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------------: | :------------------------------------------------------------------: | :-------------------------------------------------------------: | :-------------------------------------------------------------: |
|           [한원영](https://github.com/qpwoei0123)            |              [김형일](https://github.com/hyeong-il)               |              [이지효](https://github.com/dlwl8y)              |            [박지인](https://github.com/jeein2222)             |               [김어진](https://github.com/kimaj2001)               |              [이지윤](https://github.com/younihi)               |                [최서우](https://github.com/wooseoboy)               
|                            FE 부팀장                            |                                FE                                |                                FE                                |                                BE 팀장                                |                              BE                               |                                  BE                                  |                               BE                                |


<details>
<summary><h3>담당 파트</h3></summary>

### `FE`

**`한원영`**

- 회원가입, 로그인
  - 로그인 시 JWT 토큰을 받아서 저장
  - JWT토큰을 이용한 로그인 세션 유지방식 구현

- Nav
  - 로그아웃 기능 구현
  - 질문 검색기능 구현
 
- 프로필
  - 유저의 QnA Api를 받아서 stats, Question, Answer 정보를 보여준다
  - 프로팔 관련페이지 공통 header 컴포넌트 구조, 기능구현

- 관리자 기능
  - 유저권한에 따라서 컴포넌트 분기설정
  - 관리자는 모든 사용자를 삭제할수 있도록 구현

<br>

**`김형일`**

1) components

  - Side Bar 컴포넌트 구현

2) api
   
  - 1.3. 회원 정보 수정 - editUser
  - 2.2. 질문 수정  - eidtQuestion
  - 2.3. 질문 삭제  - deleteQuestion

3) page
   
- 메인페이지
  - 메인페이지 구현
- 회원정보 수정 
  - 회원정보 수정 기능 구현
  - 회원정보 수정 구조 구현
- 질문등록
  - 질문등록 기능 구현
  - 질문등록 구조 구현
- 질문수정 
  - 질문수정 기능 구현
  - 질문수정 구조 구현
- 질문삭제 
  - 질문삭제 기능 구현
  - 질문삭제 구조 구현
- 유저프로필 삭제 
  - 유저프로필 삭제 구조 구현
- 로그아웃
  - 로그아웃 구조 구현
 
<br>

**`이지효`**

1) components or modules

  - Footer
  - Router
  - Loader
  - Pagination

2) api

  - 1.6. 전체 회원 정보 조회 - getAllUser
  - 1.7. 회원 탈퇴 - deleteUser
  - 2.3. 질문 삭제  - deleteQuestion
  - 2.5. 전체 질문 조회 - allQuestion
  - 3.2. 답변 수정 - editAnswer
  - 3.5. 답변 삭제 - deleteAnswer

 3) page

  - 홈 - Home(TopQuestion)
    - 질문 작성 버튼
      - 버튼 클릭 시, 로그인을 하지 않으면 로그인 화면으로 이동
      - 버튼 클릭 시, 로그인 되어 있으면 질문 등록 페이지로 이동
    - 질문 아이템 구현
      - title, content, viewCount, answerCount, avatar, createBy, createAt, modifiedAt 요소 구현
        - title 클릭 시, 작성된 질문 페이지로 이동
        - avatar, createAt 클릭 시, 해당 유저 프로필로 이동
  - 질문 게시판 - Questions(AllQuestion)
    - 구조는 홈과 비슷, 아래는 추가 구현 기능 설명
    - 필터링 버튼 구현
      - Newest 클릭 시, 최근에 업데이트 된 질문 순으로 정렬
      - Unanswered 클릭 시, answerCount가 적은 순으로 정렬
    - 페이지네이션 구현
  - 유저 목록 - Users
    - 필터링 유저 검색창 구현
    - 페이지네이션 구현
  - 답변 수정 - EditAnswer
    - 구조 수정 및 api 추가 구현
  - 유저 프로필 삭제 - DeleteProfile
    - 체크 박스 확인 후, 삭제 가능
  - 에러 페이지 - NotFound
    - 잘못된 URI 접근 시, 화면에 노출
  - 팀 소개 - About
    - 팀명 및 팀원 이름과 각 개인의 GitHub 주소 소개 
 
<br>

### `BE`


**`박지인`**

- 사용자 정보
  - 회원가입, 로그인, 회원 탈퇴 기능
  - 회원 정보 수정 기능
  - JWT를 이용한 사용자 인증, 인가 구현
 
- OAuth2 구글 로그인
  - 구글 Cloud API 서비스를 사용한 구글 로그인 기능 구현
  - 로그인에 성공시 JWT accessToken, refreshToken 발급하도록 구현
 
- CI/CD
  - gitActions로 통합 개발 환경 구축 (https://github.com/jeein2222/seb44_pre_006)
  - EC2로 서버 구축, S3 버킷으로 클라이언트 서버 구축, RDS - mysql 사용
 
 <br>
 
**`김어진`**

- 질문 작성
  - 로그인한 회원만 작성
- 질문 수정
  - 해당 질문을 작성한 회원만 수정
- 질문 삭제 (질문 작성자만 가능)
  - 해당 질문을 작성한 회원만 삭제
  - 질문 삭제 시, 질문 조회 불가능
  - 질문 삭제 시, 관련 답변 조회 불가능
- 질문 조회
  - 전체 질문 리스트 조회 
  - 질문 내용 및 해당 질문에 대한 답변 모두 조회 
- 질문 검색
  - 제목으로 질문 검색
  
    
 
 <br>

 **`이지윤`**
 
- 답변 작성
  - 로그인한 회원만 작성
- 답변 수정
  - 로그인한 회원만 수정
  - 해당 답변의 작성자만 수정
- 답변 삭제
  - 로그인한 회원만 수정
  - 해당 답변을 작성한 회원만 삭제 가능
- 답변 조회
  - 전체 답변 조회
  - 질문 내용에 속한 답변 모두 조회
  
 <br>

 **`최서우`**

- 기능 외

  - 기능 외1
  - 기능 외2
 

- 기능
  - 기능1
  - 기능2
 
 <br>

</div>
</details>

<br/>

## 🛠️ Stacks

### <span style=""> **Tools** </span>
|                            Github                            |                           Discord                            |                            Notion                            |                              Jira                         |                              Zoom                         |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img alt="github logo" src="https://techstack-generator.vercel.app/github-icon.svg" width="65" height="65"> | <img alt="Discord logo" src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/62595384e89d1d54d704ece7_3437c10597c1526c3dbd98c737c2bcae.svg" height="65" width="65"> | <img alt="Notion logo" src="https://www.notion.so/cdn-cgi/image/format=auto,width=640,quality=100/front-static/shared/icons/notion-app-icon-3d.png" height="65" width="65"> |  <img alt="jira logo" src="https://i.ibb.co/V2pbfYY/jira.png" width="65" height="65">| <img alt="jira logo" src="https://i.ibb.co/VtXvQn6/vecteezy-zoom-logo-in-blue-colors-meetings-app-logotype-illustration-12871376-692.png" width="65" height="65">
<br/>

### <span style=""> **Front-end** </span>

|                                                                    Html                                                                    |                                                                    CSS                                                                     |                                                                          JavaScript                                                                           |                                                                              React                                                                               |                                                                                                              TypeScript                                                                                                              |                                                                 redux-toolkit                                                                  |                                                               styled-components                                                                |
|:------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------:|
| <img src="https://github.com/codestates-seb/seb44_main_033/assets/88613455/f0e21992-0fde-4d09-a335-ac3d18346789" width='65' height='65' /> | <img src="https://github.com/codestates-seb/seb44_main_033/assets/88613455/e22a55e1-e558-4bcb-b7f9-bb63df47b22d" width="65" height="65" /> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png?20221110153201" width="60" height="60"/></div> | <img src="https://github.com/codestates-seb/seb44_main_033/assets/88613455/64aea8e1-48b2-4058-baa4-e8f60504189d" width="60px" height="60px" /> | <img src="https://github.com/codestates-seb/seb44_main_033/assets/88613455/0115946a-754b-497b-b45f-c86ebaf6c10f" width="60px" height="60px" /> |


<br/>

### <span style=""> **Back-end** </span>
|                             Java                             |                            Spring                            |                        Spring<br>Boot                        |                            mySQL                             |                             AWS                              |                             JWT                              |                             Oauth2                              |  
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/java-icon.svg" alt="icon" width="65" height="65" /></div> | <img alt="spring logo" src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" height="50" width="50" > | <img alt="spring-boot logo" src="https://t1.daumcdn.net/cfile/tistory/27034D4F58E660F616" width="65" height="65" > | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/aws-icon.svg" alt="icon" width="65" height="65" /></div> | <img alt="jwt logo" src="https://i.ibb.co/xzJ0tYJ/jwt-logo.png" width="65" height="65" > | <img alt="oauth2 logo" src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Oauth_logo.svg" width="65" height="65"/></div> | 

<br/>

## 🚀 Service 

1. Stackoverflow 메인 페이지
  <img width="1440" alt="스크린샷 2023-06-27 오후 6 57 27" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/b9a56747-5dcc-4095-baf0-3453a08302b8">
  <br/>
  <br/>

2. 회원 가입 기능
  <img width="1438" alt="스크린샷 2023-06-27 오후 6 29 00" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/f55b6602-a01e-44e2-b176-a350c7687ef5">
  <br/>
  <br/>
  
3. 로그인 기능
<img width="1326" alt="스크린샷 2023-06-27 오후 6 57 44" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/5addc40b-45c5-4612-a6e0-4fff06317b32">
   <br/>
   <br/>
   
4. 로그인 후 전체 사용자 질문 확인 기능
<img width="1439" alt="스크린샷 2023-06-27 오후 6 30 24" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/65a517ee-88a4-4054-a1b8-4598e4f66fb4">
   <br/>
   <br/>

5. 전체 Question 중에서 키워드로 질문 검색 기능
  <img width="1440" alt="스크린샷 2023-06-27 오후 7 00 53" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/96a5e1ff-55d7-4316-bf12-4f5c69bdf7eb">
   <br/>
   <br/>
   
6. Ask Question 버튼 눌러서 질문 등록 기능
<img width="1439" alt="스크린샷 2023-06-27 오후 6 33 36" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/43609d40-b95e-48bd-8622-9c4e5beb7567">
   <br/>
   <br/>
   
7. 등록한 질문과 댓글 확인 기능
<img width="1440" alt="스크린샷 2023-06-27 오후 6 41 04" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/26e11b0f-d103-4c63-9299-ec2555dab083">
   <br/>
   <br/>
   
8. 다른 사용자의 질문에 댓글 등록 기능
 <img width="1438" alt="스크린샷 2023-06-27 오후 6 34 15" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/cc8e6a88-9c58-43df-bda9-8d753d82746d">
   <br/>
   <br/>
   
9. 전체 사용자 조회 기능
  <img width="1439" alt="스크린샷 2023-06-27 오후 7 03 42" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/4de09825-af13-468f-a8cf-d9a6366921f5">
   <br/>
   <br/>
   
10. 사용자 정보 수정 기능
  <img width="1440" alt="스크린샷 2023-06-27 오후 6 55 31" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/53308e5f-db71-44eb-825f-8938dc46fab2">
   <br/>
   <br/>
   
11. 사용자 계정 삭제 기능
  <img width="1439" alt="스크린샷 2023-06-27 오후 6 56 03" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/a836fc51-f476-4e80-9ca5-363f975a9a4a">
    <br/>
    <br/>
<br/>

## 💻 Documents
### ERD![seb44_pre_006](https://github.com/codestates-seb/seb44_pre_006/assets/121713161/789f2d57-cf54-4cf3-8c6d-d5abdd9ba45e)
### [사용자요구사항 정의서](https://www.notion.so/codestates/afe3b397714a49dfba59090ac8095406?pvs=4)
### [테이블 명세서](https://www.notion.so/codestates/e7400232f43a4ab186c29b00b1e77118)
### [API 명세서](https://younihi.github.io/api/#_membercontroller)
### [화면정의서](https://file.notion.so/f/s/067948eb-87e8-4e50-91a0-20fd916462da/0ee2b19e-b34b-48e3-8b95-57d61c1e14fe___%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%89%E1%85%A5.pdf?id=e9a666c5-1e03-4689-b460-522e137d5507&table=block&spaceId=82d63a72-8254-4cde-bf1e-b2597b7c099c&expirationTimestamp=1687846624368&signature=2nnLSwdwhRCXaTZKTr8uExB4wVitzCvkz6Vm9Z1gEtc&downloadName=%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%89%E1%85%A5.pdf)
### [테스트 체크리스트](https://www.notion.so/b3393093fc964a9b9bacba77af78cce0?v=5efb0b75679c4f15929a48be59bc142b)

<br/>

## ✨ 프로젝트 관리
#### ✔︎ Github의 칸반 보드를 사용하여 전체 업무 흐름 관리 및 업무 개선
<img width="1430" alt="스크린샷 2023-06-26 오후 8 32 22" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/a16aceca-635d-4e85-87e4-19e94a330223">

#### ✔︎ Zoom, Discord를 활용한 데일리 칸반 회의 및 주간 보충 회의 진행
<img width="208" alt="스크린샷 2023-06-26 오후 8 55 31" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/d724b2b1-a019-41f3-a566-a25be0599ed9">

#### ✔︎ 팀 노션을 활용한 이슈 및 문서관리
<img width="763" alt="스크린샷 2023-06-26 오후 10 49 37" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/375a1e82-b06d-4d5e-b39d-973beb0181bb">
<img width="761" alt="스크린샷 2023-06-26 오후 11 04 50" src="https://github.com/codestates-seb/seb44_pre_006/assets/121713161/effcf463-bde8-4bb7-9a16-a9c8d03e202f">

#### ✔︎ Coz'Git flow 사용한 버전 관리
|  Message   | 설명                                                  |
| :--------: | :---------------------------------------------------- |
|   [feat]   | 새로운 기능 추가    |
|   [fix]    | 버그 수정                                  |
| [refactor] | 코드 리팩토링에 대한 커밋                   |
|   [docs]   | 문서 수정                           |
|  [test]    | test 수정 및 추가                          |
|  [release] | 배포 전 release 커밋                               |
