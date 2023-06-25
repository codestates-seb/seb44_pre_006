import Footer from './component/Footer';
import Nav from './component/Nav';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const Body = styled.main`
  //top기분에서 50px 간격을 벌린다는 뜻은 아래쪽은 50px만큼 겹친다는 뜻.
  //그래서 아래쪽으로 50px만큼의 마진을 줘서 겹침 방지.
  top: 50px; //Nav 높이만큼 간격을 준다.
  margin-bottom: 50px; //간격을 준 만큼 마진을 준다.
  position: relative;
  display: flex;
  justify-content: center;
  min-height: calc(
    100vh - 50px - 70px
  ); //화면 전체 높이 - Nav 높이 - Footer 높이
  > div {
    margin: 0;
  }
`;
function App() {
  return (
    <>
      <Nav className="Nav" />
      <Body className="Body">
        <Outlet />
      </Body>
      <Footer />
    </>
  );
}

export default App;
