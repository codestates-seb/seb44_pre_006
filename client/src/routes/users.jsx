import { createBrowserRouter } from 'react-router-dom';
import Error from './page/Error';
import Users from './page/Users';
import LogIn from './page/LogIn';
import LogOut from './page/LogOut';
import SignUp from './page/SignUp';
import Profile from './page/Profile';
import EditProfile from './page/EditProfile';
import DeleteProfile from './page/DeleteProfile';

const router = createBrowserRouter([
  {
    path: 'users',
    element: <Users />,
    errorElement: <Error />,
    children: [
      {
        path: 'login',
        element: <LogIn />,
      },
      {
        path: 'logout',
        element: <LogOut />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: ':memberId/:name',
        element: <Profile />,
      },
      {
        path: 'edit/:memberId',
        element: <EditProfile />,
      },
      {
        path: 'delete/:memberId',
        element: <DeleteProfile />,
      },
    ],
  },
]);

export default router;
