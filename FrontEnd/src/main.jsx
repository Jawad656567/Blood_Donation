import './index.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Admin from "./Admin/MainAdmin.jsx";

import Home from "./Pages/Home.jsx";
import About from './Pages/About.jsx';
import FindDonor from './Pages/FindDonor.jsx';
import Campaigns from './Pages/Campaigns.jsx';
import Contact from './Pages/Contact.jsx';
import Donate from './Pages/Donate.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'find', element: <FindDonor /> },
      { path: 'campaigns', element: <Campaigns /> },
      { path: 'contact', element: <Contact /> },
      { path: 'donor', element: <Donate /> },
    ],
  },

  {
    path: '/admin',
    element: <Admin />,
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);