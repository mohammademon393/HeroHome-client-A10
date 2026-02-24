import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './layout/Root';
import Home from './pages/home/Home';
import Services from './pages/All-Services/Services';
import AddService from './pages/All-Services/AddService';
import MyBookings from './pages/All-Booking/MyBookings';
import Profile from './pages/profile/Profile';
import Login from './pages/LoginRegister/Login';
import Register from './pages/LoginRegister/Register';
import MyServices from './pages/All-Services/MyServices';

// Create a router instance
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/add-service",
        element: <AddService />,
      },
      {
        path: "/my-services",
        element: <MyServices />,
      },
      {
        path: "/my-bookings",
        element: <MyBookings />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

// Render the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);


// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />,
  </StrictMode>,
)
