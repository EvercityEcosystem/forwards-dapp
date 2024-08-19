import { useCallback, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { Spinner } from "@nextui-org/react";

import useAccountsStore from './stores/accounts';
import useThemeStore, { applyThemePreference } from "./stores/theme";

import { hc, hcInitPromise, getConnectedAccountIds } from './helpers/hashconnect';

import './AppCore.css';

const AppCore = () => {
  const navigate = useNavigate();

  const [
    isInitialized,
    isConnected,
    currentAccountId,
    initialize,
    sync
  ] = useAccountsStore((state) => [
    state.isInitialized,
    state.isConnected,
    state.currentAccountId,
    state.initialize,
    state.sync
  ]);

  const theme = useThemeStore((state) => state.theme);

  const syncWithHashConnect = useCallback(({ init }: { init?: boolean }) => {
    const connectedAccountIds = getConnectedAccountIds();

    if (init) {
      initialize();
    }

    if (connectedAccountIds.length > 0) {
      sync();
    }
  }, [initialize, sync]);

  useEffect(() => {
    syncWithHashConnect({});
    hcInitPromise.then(() => {
      syncWithHashConnect({ init: true });
    });
    hc.pairingEvent.on(() => {
      syncWithHashConnect({});
    });
    hc.disconnectionEvent.on(() => {
      syncWithHashConnect({});
    });
    hc.connectionStatusChangeEvent.on(() => {
      syncWithHashConnect({});
    });
  }, [syncWithHashConnect]);

  useEffect(() => {
    applyThemePreference(theme);
  }, [theme])

  useEffect(() => {
    if (!isConnected || !currentAccountId) {
      navigate('/connect');
    } else {
      navigate('/app');
    }
  }, [navigate, isConnected, currentAccountId]);

  const LoadingSpinner = () => (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-cyan-300 via-orange-200 to-fuchsia-400 p-2 sm:p-4 lg:p-8">
      <Spinner />
    </div>
  );

  return (
    <NextUIProvider navigate={navigate}>
      <main className="text-foreground bg-background">
        { isInitialized ? <Outlet /> : <LoadingSpinner /> }
      </main>
    </NextUIProvider>
  );
};

export default AppCore;
