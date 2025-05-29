import type {
  ListUpdateUserInfoVo,
  LoginUserVo,
  SendCaptchaVo,
  UpdateUserInfoDto,
  UpdateUserInfoVo,
  UserLogin,
  UserRegisterDto,
  UserRegisterVo,
  UserUpdatePasswordDto,
  UserUpdatePasswordVo,
} from '@/types/user';
import { http } from '../index';
import { getTwoToken } from '@/utils/getToken';

const PATH = 'user';

export const login = async (dto: UserLogin): Promise<LoginUserVo> => {
  return await http.post(`${PATH}/login`, dto);
};

export const register = async (
  dto: UserRegisterDto,
): Promise<UserRegisterVo> => {
  return await http.post(`${PATH}/register`, dto);
};

export const sendCaptcha = async (
  type: string,
  email: string,
): Promise<SendCaptchaVo> => {
  return await http.get(`${PATH}/${type}-captcha?address=${email}`);
};

export const updatePassword = async (
  dto: UserUpdatePasswordDto,
): Promise<UserUpdatePasswordVo> => {
  return await http.post(`${PATH}/update_password`, dto);
};

export const getUserInfo = async (): Promise<ListUpdateUserInfoVo> => {
  return await http.get(`${PATH}/info`);
};

export const refreshToken = () => {
  return http.get(`${PATH}/refresh`, {
    params: {
      refresh_token: getTwoToken().refreshToken,
    },
  });
};

export const update = async (
  dto: UpdateUserInfoDto,
): Promise<UpdateUserInfoVo> => {
  return await http.post(`${PATH}/update`, dto);
};

export const upload = async (file: any) => {
  return await http.post(`${PATH}/upload`, file);
};
