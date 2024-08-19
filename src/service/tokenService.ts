import {AccountId, NftId, TokenId, Hbar, TransferTransaction, TransactionId} from "@hashgraph/sdk";
import {hc} from "../helpers/hashconnect";

export const nftSwap = async ({
  tokenId,
  hBars,
  issuer,
  to,
  from,
}: {
  tokenId: string;
  hBars: number;
  issuer: string;
  from: string;
  to: string;
}) => {

  const tx = await new TransferTransaction()
    //send hbars to issuer
    .addHbarTransfer(to, new Hbar(-hBars))
    .addHbarTransfer(issuer, new Hbar(hBars))

    //send nft to buyer
    .addNftTransfer(new NftId(TokenId.fromString(tokenId), 1), from, to)

    .setTransactionId(TransactionId.generate(to))
    .setNodeAccountIds([AccountId.fromString("0.0.3")])
    .freeze()


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const signedTx = await hc.signTransaction(AccountId.fromString(to), tx)

  return await fetch(`${import.meta.env.VITE_API_URL}/forwards-dapp/api/v1/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream"
    },
    body: signedTx.toBytes()
  }).then(res => res.json());
}
