import { create } from 'zustand';
import {Mascot} from "../types";
import useAccountsStore from "./accounts.ts";


interface IMascotsState {
  mascots: Mascot[];
  loading: boolean;
  fetch(): Promise<void>;
}

const useMascotsStore = create<IMascotsState>(
  (set) => ({
    mascots: [],
    loading: false,
    fetch: async () => {
      set({ loading: true });
      const response =
        await fetch(`${import.meta.env.VITE_API_URL}/forwards-dapp/api/v1/mascots?accountId=${useAccountsStore.getState().currentAccountId}`)
          .then(res => res.json());
      set({ mascots: Object.entries(response.data).map(([type, token]) => ({
          type,
          name: token.name,
          tokenId: token.tokenId,
          image: token.image,
        })) });
      set({ loading: false });
    },
  }),
);

export default useMascotsStore;
