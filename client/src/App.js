import SideBar from "./component/SideBar";
import Footer from './component/Footer'
import Nav from './component/Nav'
import store from "./store/store";
import { Provider } from "react-redux";

function App() {

  return (
    <div>
      <Provider store={store}>
        <Nav/>
        <SideBar/>
        <Footer/>
      </Provider>
    </div>
  )
}

export default App;
