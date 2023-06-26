import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Main from "./page/Main";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import Users from "./page/Users";
import LogIn from "./page/LogIn";
import LogOut from "./page/LogOut";
import SignUp from "./page/SignUp";
import Profile from "./page/Profile";
import EditProfile from "./page/EditProfile";
import DeleteProfile from "./page/DeleteProfile";
import AllQuestion from "./page/AllQuestion";
import AskQuestion from "./page/AskQuestion";
import Answer from "./page/Answer";
import ApiTest from "./page/ApiTest";
import EditQuestion from "./page/EditQuestion";
import EditAnswer from "./page/EditAnswer";

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
        path: "/user",
        element: <Users />,
      },
      {
        path: "/user/:memberId",
        element: <Profile />,
      },
      {
        path: "/user/edit/:memberId",
        element: <EditProfile />,
      },
      {
        path: "/user/delete/:memberId",
        element: <DeleteProfile />,
      },
      {
        path: "/user/login",
        element: <LogIn />,
      },
      {
        path: "/user/logout",
        element: <LogOut />,
      },
      {
        path: "/user/signup",
        element: <SignUp />,
      },
      {
        path: "/question",
        element: <AllQuestion />,
      },
      {
        path: "/question/ask",
        element: <AskQuestion />,
      },
      {
        path: "/question/:id",
        element: <Answer />,
      },
      {
        path: "/apitest",
        element: <ApiTest />,
      },
      {
        path: "/question/edit/:questionId",
        element: <EditQuestion />,
      },
      {
        path: "/answer/edit/:answerId",
        element: <EditAnswer />,
      },
    ],
  },
]);

export default router;
