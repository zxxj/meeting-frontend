// 登录表单
export interface UserLoginForm {
  username: string;
  password: string;
}

// 登录接口dto
export interface UserLogin {
  username: string;
  password: string;
}

// 登录vo
export interface Role {
  id: number;
  name: string;
}

export interface Permission {
  id: number;
  code: string;
  description: string;
}

export interface UserInfo {
  id: number;
  avatar: string;
  username: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
  isFrozen: boolean;
  roles: Role[];
  permissions: Permission[];
  createTime: Date;
}

export interface LoginUserVo {
  code: number;

  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    userInfo: UserInfo;
  };
}

// 注册表单
export interface UserRegisterForm {
  username: string;
  password: string;
  repassword: string;
  nickname: string;
  email: string;
  captcha: string;
}

// 注册dto
export interface UserRegisterDto {
  username: string;
  nickname: string;
  password: string;
  email: string;
  captcha: string;
}

// 注册vo
export interface UserRegisterVo {
  code: number;
  message: string;
}

// 发送验证码vo
export interface SendCaptchaVo {
  code: number;
  data: string;
  message: string;
}

// 更新密码表单
export interface UserUpdatePasswordForm {
  username: string;
  email: string;
  captcha: string;
  password: string;
  repassword: string;
}

// 更新密码dto
export interface UserUpdatePasswordDto {
  username: string;
  email: string;
  captcha: string;
  password: string;
}

// 更新密码vo
export interface UserUpdatePasswordVo {
  code: number;
  data: string;
  message: string;
}

// 修改个人信息表单
export interface UpdateUserInfoForm {
  username: string;
  phoneNumber: string;
  avatar: string;
  nickname: string;
  email: string;
  captcha: string;
}

// 查询个人信息vo
export interface ListUpdateUserInfoVo {
  code: number;
  data: {
    id: number;
    username: string;
    nickname: string;
    avatar: string;
    email: string;
    isAdmin: boolean;
    isFrozen: boolean;
    phoneNumber: string;
    createTime: Date;
    updateTime: Date;
  };
  message: string;
}

// 更新个人信息dto
export interface UpdateUserInfoDto {
  username: string;
  avatar: string;
  nickName: string;
  phoneNumber: string;
  email: string;
  captcha: string;
}

// 更新个人信息vo
export interface UpdateUserInfoVo {
  code: number;
  message: string;
  data: string;
}
