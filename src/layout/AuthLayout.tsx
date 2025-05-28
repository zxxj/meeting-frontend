// 注册/登录/修改密码/错误页等等的容器
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

const AuthLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export default AuthLayout;
