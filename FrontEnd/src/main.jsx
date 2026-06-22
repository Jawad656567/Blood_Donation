import './index.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Admin from "./Admin/MainAdmin.jsx";

import Home from "./Pages/Home.jsx";
import About from './Pages/About.jsx';
import Donate from './Pages/Donate.jsx';
import FindDonor from './Pages/FindDonor.jsx';
import Mission from './Pages/Mission.jsx';
import Help from './Pages/Help.jsx';
import Contact from './Pages/Contact.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <Home /> },
      { path: 'donate-blood', element: <Donate /> },
      { path: 'find-donors', element: <FindDonor /> },
      { path: 'mission', element: <Mission /> },
      { path: 'help', element: <Help /> },
      { path: 'contact', element: <Contact /> },
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