'use client';
import { AuthPage as AuthPageBase } from '@refinedev/antd';
import type { AuthPageProps } from '@refinedev/core';

export const AuthPage = (props: AuthPageProps) => {
  return (
    <AuthPageBase
      {...props}
      formProps={{
        initialValues: { email: 'admin@mail.com', password: 'demodemo' },
      }}
    />
  );
};
