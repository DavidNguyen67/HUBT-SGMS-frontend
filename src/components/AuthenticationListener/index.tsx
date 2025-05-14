import { resources } from '@common/resources';
import { authProviderClient } from '@providers/auth-provider/auth-provider.client';
import { ResourceProps, useIsAuthenticated } from '@refinedev/core';
import { useEffect } from 'react';

interface AuthenticationListenerProps {
  setVisibleResources: (resources: ResourceProps[]) => void;
}

const AuthenticationListener = ({
  setVisibleResources,
}: AuthenticationListenerProps) => {
  const { data: authData } = useIsAuthenticated();

  useEffect(() => {
    const getUserRole = async () => {
      const userRole =
        (await authProviderClient?.getPermissions?.()) as string[];

      const filteredResources = userRole
        ? resources.filter((resource) => {
            const roles = resource.meta?.roles as string[] | undefined;
            return (
              !roles ||
              roles.length === 0 ||
              roles.includes(userRole?.[0] ?? userRole)
            );
          })
        : [];

      setVisibleResources(filteredResources);
    };

    getUserRole();
  }, [authData?.authenticated, setVisibleResources]);

  return null;
};

export default AuthenticationListener;
