import { getItem } from './local';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const getTwoToken = () => {
  const tokens: Tokens = {
    accessToken: getItem('access_token') as string,
    refreshToken: getItem('refresh_token') as string,
  };

  return tokens;
};
