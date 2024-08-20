import {useEffect, useState, useMemo} from "react";
import {MascotCard} from "./MascotCard";
import useMintMascotStore from "../stores/mintMascotStore";
import {Mascot} from "../types";
import {BuyMascotModal} from "./BuyMascotModal";
import useAuthStore from "../stores/accounts";
import useFetchBalance from "../hooks/useFetchBalance";
import useMascotsStore from "../stores/mascotsStore.ts";
import {Spinner} from "@nextui-org/react";

const NFTMarketplace = () => {
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const selectMascot = useMintMascotStore(state => state.select);
  const currentAccountId = useAuthStore((state) =>
    state.currentAccountId,
   );

  const [fetch, mascots, loading] = useMascotsStore(state => [state.fetch, state.mascots, state.loading]);
  const { balance } =  useFetchBalance(currentAccountId);

  useEffect(() => {
    fetch();
  }, []);

  const onClickMascot = (mascot: Mascot) => {
    selectMascot(mascot);
    setOpenBuyModal(true);
  };

  const enhancedMascots = useMemo(() => {
    return mascots.map((mascot) => ({
      ...mascot,
      isBought: !!balance?.tokens.find(token => mascot.tokenId === token.token_id && token.balance > 0)
    }));
  }, [balance, loading]);

  if(loading) {
    return <Spinner />;
  }

  return (<>
    <div>
      <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
        <h2 className="text-medium font-medium text-default-700">Mascots</h2>
      </header>
      <main className="mt-4 h-full w-full overflow-visible">
        <section id="My NFTs" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {enhancedMascots.map((mascot) => <MascotCard
            isBought={mascot.isBought}
            image={mascot.image}
            onClick={() => {
              if (mascot.isBought) {
                return;
              }

              onClickMascot(mascot as Mascot)
            }}
            name={mascot.name}
          />)}
        </section>
      </main>
    </div>
      <BuyMascotModal
        isOpen={openBuyModal}
        onOpenChange={(value) => setOpenBuyModal(value)}
      />
    </>
  );
};

export default NFTMarketplace;
