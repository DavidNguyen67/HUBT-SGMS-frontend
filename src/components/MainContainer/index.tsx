'use client';

import { useNotificationProvider } from '@refinedev/antd';
import { Refine, ResourceProps, useIsAuthenticated } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import routerProvider from '@refinedev/nextjs-router';
import React, { Suspense, useEffect, useState } from 'react';
import { authProviderClient } from '@providers/auth-provider/auth-provider.client';
import { dataProvider } from '@providers/data-provider';
import '@refinedev/antd/dist/reset.css';
import { resources } from '@common/resources';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ColorModeContextProvider } from '@contexts/color-mode';
import { DevtoolsProvider } from '@refinedev/devtools';
import AuthenticationListener from '@components/AuthenticationListener';

interface MainContainerProps {
  children: React.ReactNode;
  defaultMode?: 'light' | 'dark';
}

const MainContainer = ({ children, defaultMode }: MainContainerProps) => {
  const [visibleResources, setVisibleResources] = useState<ResourceProps[]>([]);

  return (
    <Suspense>
      <RefineKbarProvider>
        <AntdRegistry>
          <ColorModeContextProvider defaultMode={defaultMode}>
            <DevtoolsProvider>
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
                <AuthenticationListener
                  setVisibleResources={setVisibleResources}
                />
                {children}
                <RefineKbar />
              </Refine>
            </DevtoolsProvider>
          </ColorModeContextProvider>
        </AntdRegistry>
      </RefineKbarProvider>
    </Suspense>
  );
};

export default MainContainer;
