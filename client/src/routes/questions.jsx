import { createBrowserRouter } from 'react-router-dom';
import Error from './page/Error';
import AllQuestion from './page/AllQuestion';
import AskQuestion from './page/AskQuestion';
import Answer from './page/Answer';

const router = createBrowserRouter([
  {
    path: 'questions',
    element: <AllQuestion />,
    errorElement: <Error />,
    children: [
      {
        path: 'ask',
        element: <AskQuestion />,
      },
      {
        path: 'questions/:memberId/:title',
        element: <Answer />,
      },
    ],
  },
]);

export default router;
