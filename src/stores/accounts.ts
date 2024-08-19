import { create } from 'zustand';
import { hc, getConnectedAccountIds } from '../helpers/hashconnect';
import { persist } from 'zustand/middleware';

const useAccountsStore = create(
  persist(
    (set) => ({
      isInitialized: false,
      isConnected: false,
      accountIds: [],
      currentAccountId: null,
      pairingString: hc.pairingString ?? "",
      initialize: () => set({ isInitialized: true }),
      selectAccount: (accountId: string) => set({ currentAccountId: accountId }),
      sync: () => set({ isConnected: true, accountIds: getConnectedAccountIds()?.map((o) => o.toString() || []), pairingString: hc.pairingString ?? "" }),
      disconnect: () => set({ currentAccountId: null, isConnected: false, accountIds: [], pairingString: hc.pairingString ?? "" }),
    }),
    {
      name: 'accountsStore',
      partialize: (state) => ({ currentAccountId: state.currentAccountId }),
    },
  )
);

export default useAccountsStore;
