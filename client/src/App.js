import Footer from './component/Footer'
import Nav from './component/Nav'
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const Body = styled.main`
 display: flex;
 flex-direction: column;
 top: 8vh;
 bottom: 100px;
 position: relative;
 min-height: 90vh;
 
`
function App() {
  return (
    <div>
      <Nav/>
      <Body>
        <Outlet />
      </Body>
      <Footer/>
    </div>
  );
}

export default App;
