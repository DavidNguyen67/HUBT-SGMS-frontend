'use client';

import { ROLE } from '@common';
import type { AuthProvider } from '@refinedev/core';
import Cookies from 'js-cookie';

const mockUsers = [
  {
    name: 'Admin User',
    email: 'admin@mail.com',
    roles: [ROLE.ADMIN],
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Teacher User',
    email: 'teacher@mail.com',
    roles: [ROLE.TEACHER],
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Student User',
    email: 'student@mail.com',
    roles: [ROLE.STUDENT],
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

export const authProviderClient: AuthProvider = {
  login: async ({ email, username, password, remember }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/v1/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!res.ok) {
        return {
          success: false,
          error: {
            name: 'LoginError',
            message: 'Invalid username or password',
          },
        };
      }

      const data = await res.json();
      // Lưu accessToken và refreshToken vào cookie
      Cookies.set('accessToken', data.accessToken, {
        expires: 30,
        path: '/',
      });
      Cookies.set('refreshToken', data.refreshToken, {
        expires: 30,
        path: '/',
      });

      // Nếu muốn lưu thêm user info, cần gọi API lấy user info và lưu vào cookie 'auth'
      // Hoặc chỉ lưu token, sau này lấy user info từ token

      return {
        success: true,
        redirectTo: '/dashboard',
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: 'LoginError',
          message: 'Có lỗi xảy ra khi đăng nhập',
        },
      };
    }
  },
  logout: async () => {
    Cookies.remove('auth', { path: '/' });
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: '/login',
    };
  },
  getPermissions: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get('auth');
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
