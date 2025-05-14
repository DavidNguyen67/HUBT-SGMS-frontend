'use client';

import { useNotificationProvider } from '@refinedev/antd';
import { Refine, ResourceProps } from '@refinedev/core';
import { RefineKbar } from '@refinedev/kbar';
import routerProvider from '@refinedev/nextjs-router';
import React, { useEffect, useState } from 'react';
import { authProviderClient } from '@providers/auth-provider/auth-provider.client';
import { dataProvider } from '@providers/data-provider';
import '@refinedev/antd/dist/reset.css';
import { resources } from '@common/resources';

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  const [visibleResources, setVisibleResources] = useState<ResourceProps[]>([]);

  useEffect(() => {
    const getUserRole = async () => {
      const userRole =
        (await authProviderClient?.getPermissions?.()) as string[];
      if (!userRole) {
        const filteredResources = resources.filter((resource) => {
          const roles = resource.meta?.roles as string[] | undefined;
          return roles?.includes(userRole?.[0] ?? userRole);
        });

        setVisibleResources(filteredResources);
      }
    };

    getUserRole();
  }, []);

  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider}
      notificationProvider={useNotificationProvider}
      authProvider={authProviderClient}
      resources={visibleResources}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        useNewQueryKeys: true,
        projectId: 'BqkOw9-rTT8QE-6I7UhU',
      }}
    >
      {children}
      <RefineKbar />
    </Refine>
  );
};

export default MainContainer;
