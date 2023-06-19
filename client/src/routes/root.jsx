import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './page/Main';
import Home from './page/Home';
import Error from './page/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Main /> },
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
]);

export default router;
