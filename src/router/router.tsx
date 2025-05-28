import { createBrowserRouter } from 'react-router-dom';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { UpdatePassword } from '@/pages/UpdatePassword';
import { Error } from '@/pages/Error';
import MainLayout from '@/layout/MainLayout';
import AuthLayout from '@/layout/AuthLayout';

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/aaa',
        element: <div>123</div>,
      },
      {
        path: '/bbb',
        element: <div>bbb</div>,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'updatePassword',
        element: <UpdatePassword />,
      },
      {
        path: 'error',
        element: <Error />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
