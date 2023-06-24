import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Main from "./page/Main";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import Users from "./page/Users";
import LogIn from "./page/LogIn";
import LogOut from "./page/LogOut";
import SighUp from "./page/SighUp";
import Profile from "./page/Profile";
import EditProfile from "./page/EditProfile";
import DeleteProfile from "./page/DeleteProfile";
import AllQuestion from "./page/AllQuestion";
import AskQuestion from "./page/AskQuestion";
import Answer from "./page/Answer";
import ApiTest from "./page/ApiTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      {
        path: "/home",
        element: <Home />,
      },
      {

        path: '/user',
        element: <Users />,
      },
      {
        path: '/user/:memberId/:name',
        element: <Profile />,
      },
      {
        path: '/user/edit/:memberId',
        element: <EditProfile />,
      },
      {
        path: '/user/delete/:memberId',
        element: <DeleteProfile />,
      },
      {
        path: '/user/login',
        element: <LogIn />,
      },
      {
        path: '/user/logout',
        element: <LogOut />,
      },
      {
        path: '/user/sighup',
        element: <SighUp />,
      },
      {
        path: '/question',
        element: <AllQuestion />,
      },
      {
        path: '/question/ask',
        element: <AskQuestion />,
      },
      {
        path: '/question/:memberId/:title',
        element: <Answer />,
      },
      {
        path: "/apitest",
        element: <ApiTest />,
      },
    ],
  },
]);

export default router;