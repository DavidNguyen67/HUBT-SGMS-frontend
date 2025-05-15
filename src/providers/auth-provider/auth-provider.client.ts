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
    const user = mockUsers.find((item) => item.email === email);

    if (user) {
      Cookies.set('auth', JSON.stringify(user), {
        expires: 30, // 30 days
        path: '/',
      });
      return {
        success: true,
        redirectTo: '/',
      };
    }

    return {
      success: false,
      error: {
        name: 'LoginError',
        message: 'Invalid username or password',
      },
    };
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
