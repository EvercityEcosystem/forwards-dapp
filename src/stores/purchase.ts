import { create } from 'zustand';
import {nftSwap} from "../service/tokenService";
import useAccountsStore from "./accounts";

type Project = {
  name: string;
  token: {
    id: string;
    price: number;
    issuer: string;
  };
}

interface PurchaseStore {
  project: Project | null;
  loading: boolean;
  buy(): Promise<void>;
  selectProject(project: Project): void;
}

const marketplace = import.meta.env.VITE_MARKETPLACE_ID;
if(!marketplace) {
  throw new Error("Missing VITE_MARKETPLACE_ID");
}

const usePurchaseStore = create<PurchaseStore>(
  (set, get) => ({
    project: null,
    loading: false,
    buy: async () => {
      const project = get().project;
      if(!project) {
        throw new Error("Project not found!");
      }
      set({loading: true});
      try {
        await nftSwap({
          from: marketplace,
          to: useAccountsStore.getState().currentAccountId as string,
          tokenId: project.token.id,
          hBars: project.token.price,
          issuer: project.token.issuer,
        });
      } catch (e) {
        console.log(e)
      }
      set({loading: false});
    },
    selectProject: (project: Project) => set({project}),
    resetProject: () => set({project: null}),
  }),
);

export default usePurchaseStore;
