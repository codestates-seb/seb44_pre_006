import Footer from './component/Footer'
import Nav from './component/Nav'
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div>

      <Nav/>
        <Outlet />
      <Footer/>

    </div>
  );
}

export default App;
