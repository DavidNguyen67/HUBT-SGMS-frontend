import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const useAccount = () => {
  const accessToken = Cookies.get('accessToken') ?? '';

  const data = jwtDecode(accessToken);

  return {
    sub: data.sub,
  };
};
