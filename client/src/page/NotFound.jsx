import axios from 'axios';

function Error() {
  const jwt = localStorage.getItem('jwtToken');

  const on1_6 = async () => {
    await axios
      .get('/users?page=1&size=10')
      .then(response => console.log(response))
  }

  const on1_7 = async () => {
    await axios
      .delete('/users/4', 
      {headers: {
        Authorization: jwt
      }})
      .then(response => console.log(response))
  }

  const on1_8 = async () => {
    await axios
      .delete('/users', 
      {headers: {
        Authorization: jwt
      }})
      .then(response => console.log(response))
  }

  const on2_1 = async () => {
    await axios
      .post('/questions/ask', {title: '제목1', content: '내용1',}, 
      {headers: {
        Authorization: jwt
      }})
      .then(response => console.log(response))
  }

  const on2_2 = async () => {
    await axios
      .patch('/questions/posts/1/edit', {title: ' 수정된 타이틀 테스트 입니다', content: '수정된 내용 테스트 입니다.',}, 
      {headers: {
        Authorization: jwt
      }})
      .then(response => console.log(response))
  }

  const on2_3 = async () => {
    await axios
      .delete('/questions/1', 
      {headers: {
        Authorization: jwt
      }})
      .then(response => console.log(response))
  }

  const on2_4 = async () => {
    await axios
      .get('/questions/2')
      .then(response => console.log(response))
  }

  const on2_5 = async () => {
    await axios
      .get('/questions?size=10&page=1')
      .then(response => console.log(response))
  }

  // 제목 검색 시 get 요청 성공했으나, 응답 body에 data가 없음.
  const on2_6 = async () => {
    await axios
      .get('/questions/search?size=10&page=1&title="제목1"')
      .then(response => console.log(response))
  }

  const on3_5 = async () => {
    await axios
      .delete('/answers/1', 
      {headers: {
        Authorization: jwt
      }})
      .then(response => console.log(response))
  }

  return (
    <div>
      <button onClick={on1_6}>전체 회원 정보 조회</button>
      <button onClick={on1_7}>회원 탈퇴</button>
      <button onClick={on1_8} style={{color: "red"}}>전체 회원 삭제</button>
      <button onClick={on2_1}>질문 등록</button>
      <button onClick={on2_2}>질문 수정</button>
      <button onClick={on2_3}>질문 삭제</button>
      <button onClick={on2_4}>단일 질문 조회</button>
      <button onClick={on2_5}>전체 질문 조회</button>
      <button onClick={on2_6}>제목 검색</button>
      <button onClick={on3_5}>답변 삭제</button>
    </div>
  );
}

export default Error;