import { createBrowserRouter, RouterProvider, } from 'react-router-dom';

import AppCore from '../AppCore.tsx';
import Connect from './Connect.tsx';
import ErrorPage from './ErrorPage.tsx';
import AppLayout from './AppLayout.tsx';
import Home from './Home.tsx';
import Projects from './Projects.tsx';
import NFTMarketplace from './NFTMarketplace.tsx';
import Settings from './Settings.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppCore />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "connect",
        element: <Connect />,
      },
      {
        path: "app",
        element: <AppLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "projects",
            element: <Projects />,
          },
          {
            path: "nfts",
            element: <NFTMarketplace />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ]
      },
    ],
  },
]);

const Routes = () => (<RouterProvider router={router} />);

export default Routes;
