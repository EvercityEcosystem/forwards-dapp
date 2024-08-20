import {useState} from "react";
import {MascotCard} from "./MascotCard";
import useMintMascotStore from "../stores/mintMascotStore";
import {Mascot} from "../types";
import {BuyMascotModal} from "./BuyMascotModal";
import useAuthStore from "../stores/accounts";
import useFetchBalance from "../hooks/useFetchBalance";
import { mascots } from "../config";

const NFTMarketplace = () => {
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const selectMascot = useMintMascotStore(state => state.select);
  const currentAccountId = useAuthStore((state) =>
    state.currentAccountId,
   );

  const { balance } =  useFetchBalance(currentAccountId);

  const onClickMascot = (mascot: Mascot) => {
    selectMascot(mascot);
    setOpenBuyModal(true);
  };

  return (<>
    <div>
      <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
        <h2 className="text-medium font-medium text-default-700">Mascots</h2>
      </header>
      <main className="mt-4 h-full w-full overflow-visible">
        <section id="My NFTs" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {mascots.map((mascot) => {
            const isBouhgt = Boolean(balance?.tokens.find((token) => mascot.tokenId === token.token_id && token.balance !== 0))
            return (<MascotCard
              isBought={isBouhgt}
              image={mascot.image}
              onClick={() => {
                if(!isBouhgt) {
                  onClickMascot(mascot as Mascot)
                }
              }}
                name={mascot.name}
                />)
          })}
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
