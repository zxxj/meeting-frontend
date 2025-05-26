import { Link, Outlet, createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { UpdatePassword } from '../pages/UpdatePassword';
import { Error } from '../pages/Error';

const Layout = () => {
  return (
    <div>
      <div>
        <Link to="/login">login</Link>
        <Link to="/register">register</Link>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export const routes = [
  {
    path: '/',
    element: <Layout />,
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
