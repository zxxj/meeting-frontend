import type {
  LoginUserVo,
  SendCaptchaVo,
  UserLogin,
  UserRegisterDto,
  UserRegisterVo,
  UserUpdatePasswordDto,
  UserUpdatePasswordVo,
} from '@/types/user';
import { http } from '../index';

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
