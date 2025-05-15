'use client';

import { Suspense, useEffect } from 'react';
import { useIsAuthenticated, useResource } from '@refinedev/core';
import { redirect, useRouter } from 'next/navigation';
import { authProviderClient } from '@providers/auth-provider/auth-provider.client';
import { resources } from '@common/resources';

export default function IndexPage() {
  const { data: authData } = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    const redirectToFirstAccessibleResource = async () => {
      if (authData?.authenticated) {
        const userRole =
          (await authProviderClient?.getPermissions?.()) as string[];

        const firstMatchingResource = resources.find((resource) => {
          const roles = resource.meta?.roles as string[] | undefined;
          return (
            !roles ||
            roles.length === 0 ||
            roles.includes(userRole?.[0] ?? userRole)
          );
        });

        if (firstMatchingResource?.list) {
          router.push(firstMatchingResource.list as string);
        } else {
          redirect('/login');
        }
      }
    };

    redirectToFirstAccessibleResource();
  }, [authData?.authenticated, router]);

  return <Suspense fallback={<div>Loading...</div>} />;
}
