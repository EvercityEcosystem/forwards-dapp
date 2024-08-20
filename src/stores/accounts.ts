import { create } from 'zustand';
import { hc, getConnectedAccountIds } from '../helpers/hashconnect';
import { persist } from 'zustand/middleware';


interface IAccountsState {
  isInitialized: boolean;
  isConnected: boolean;
  accountIds: string[],
  currentAccountId: null | string,
  pairingString: string;

  initialize(): void;
  sync(): void;
  selectAccount(accountId: string): void;
  disconnect(): void;
}



const initialState = {
  isInitialized: false,
  isConnected: false,
  accountIds: [],
  currentAccountId: null,
  pairingString: hc.pairingString ?? "",
};

const useAccountsStore = create(
  persist(
    (set) => ({
      ...initialState,
      initialize: () => set({ isInitialized: true }),
      selectAccount: (accountId: string) => set({ currentAccountId: accountId }),
      sync: () => set({ isConnected: true, accountIds: (getConnectedAccountIds()?.map((o) => o.toString())|| [] as string[]), pairingString: hc.pairingString ?? "" }),
      disconnect: () => set({ ...initialState }),
    }),
    {
      name: 'accountsStore',
      partialize: (state: IAccountsState) => ({ currentAccountId: state.currentAccountId }),
    },
  )
);

export default useAccountsStore;
