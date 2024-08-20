import { create } from 'zustand';
import {Mascot} from "../types";
import {mintMascot} from "../service/tokenService.ts";
import useAccountsStore from "./accounts.ts";

interface PurchaseStore {
  mascot: Mascot | null;
  loading: boolean;
  mint(): Promise<void>;
  select(mascot: Mascot): void;
}

const marketplace = import.meta.env.VITE_MARKETPLACE_ID;
if(!marketplace) {
  throw new Error("Missing VITE_MARKETPLACE_ID");
}

const usePurchaseMascotStore = create<PurchaseStore>(
  (set, get) => ({
    mascot: null,
    loading: false,
    mint: async () => {
      const maskot = get().mascot;
      if(!maskot) {
        throw new Error("Project not found!");
      }
      set({loading: true});
      try {
        await mintMascot({
          marketplace,
          hBars: 1,
          type: maskot!.type,
          from: useAccountsStore.getState().currentAccountId as string,
          tokenId: maskot.tokenId,
        });
      } catch (e) {
        console.log(e)
      }
      set({loading: false});
    },
    select: (mascot: Mascot) => set({mascot}),
    reset: () => set({mascot: null}),
  }),
);

export default usePurchaseMascotStore;
