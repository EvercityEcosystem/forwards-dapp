import {
  AccountId,
  NftId, TokenId, Hbar, TransferTransaction, TransactionId,
  TokenAssociateTransaction,
} from "@hashgraph/sdk";
import {hc} from "../helpers/hashconnect";


export const tokenAssociate = async (
  {
    tokenId,
    accountId
  }: {
    tokenId: string;
    accountId: string;
  }
) => {
  const response = await fetch(`https://testnet.mirrornode.hedera.com/api/v1/accounts/${accountId}`).then(res => res.json());
  const associatedToken = response.balance.tokens.find((token: {token_id: string}) => token.token_id === tokenId);

  if(associatedToken) {
    return
  }

  const transaction = await new TokenAssociateTransaction()
    .setAccountId(accountId)
    .setTokenIds([tokenId])
    .setNodeAccountIds([AccountId.fromString("0.0.3")])
    .setTransactionId(TransactionId.generate(accountId))
    .freeze();


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const transactionResponse = await hc.sendTransaction(AccountId.fromString(accountId), transaction);
  return transactionResponse.status
};

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

  return await fetch(`${import.meta.env.VITE_API_URL}/forwards-dapp/api/v1/buy?accountId=${to}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream"
    },
    body: signedTx.toBytes()
  }).then(res => res.json());
}

export const mintMascot =
  async (
    {
      hBars,
      marketplace,
      from,
      type,
      tokenId
    }: {
      hBars: number;
      marketplace: string;
      from: string;
      type: string;
      tokenId: string;
    }
  ) => {

  await tokenAssociate({
    tokenId,
    accountId: from
  });
  const tx = await new TransferTransaction()
    //send hbars to marketplace
    .addHbarTransfer(from, new Hbar(-hBars))
    .addHbarTransfer(marketplace, new Hbar(hBars))

    .setTransactionId(TransactionId.generate(from))
    .setNodeAccountIds([AccountId.fromString("0.0.3")])
    .freeze()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const signedTx = await hc.signTransaction(AccountId.fromString(from), tx)

  return await fetch(`${import.meta.env.VITE_API_URL}/forwards-dapp/api/v1/mintMascot?type=${type}&accountId=${from}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream"
    },
    body: signedTx.toBytes()
  }).then(res => res.json());
}
