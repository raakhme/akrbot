import styled from 'styled-components';
import { useBoolean, useLocalStorage, useToggle } from 'react-use';
import * as api from '@akrbot/api';
import { useCallback, useEffect, useState } from 'react';
import { PageLoading } from '../components';
import { ChakraProvider } from '@chakra-ui/react';
import { InitProject } from '../features';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const [uid, setUid] = useLocalStorage('server-config-uid');
  const [isConfigInited, setIsConfigInited] = useToggle(!!uid);
  const [loading, setLoading] = useBoolean(true);

  const checkApi = useCallback(async () => {
    try {
      const { data } = await api.config.getConfig(null);
      console.log({ data });
      if (data?.id) {
        setIsConfigInited(true);
        setUid(data?.id);
      }
    } catch (err) {
      setIsConfigInited(false);
    } finally {
      setLoading(false);
    }
  }, [setIsConfigInited, setUid, setLoading]);

  useEffect(() => {
    checkApi();
  }, [checkApi]);

  return (
    <ChakraProvider>
      <PageLoading loading={loading} label="Загрузка приложения">
        {isConfigInited ? 'Config inited' : <InitProject />}
      </PageLoading>
    </ChakraProvider>
  );
}

export default App;
