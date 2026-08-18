import { useEffect, useState } from 'react';
import { getCredentials } from '../utills/secureStorage';

export const useUserProfile = (route: any) => {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const loadName = async () => {
      if (route.params?.user?.name) {
        setDisplayName(route.params.user.name);
        return;
      }

      const credentials = await getCredentials();

      if (credentials?.name) {
        setDisplayName(credentials.name);
      }
    };

    loadName();
  }, [route.params?.user?.name]);

  return displayName;
};