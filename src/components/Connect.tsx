"use client";

import React from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";

import useAuthStore from '../stores/accounts';
import { hc, getConnectedAccountIds } from '../helpers/hashconnect';

const SelectAccountForm = ({ onSelect }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ account }) => {
    onSelect(account);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <p className="pb-2 text-xl font-medium">Select Wallet Account</p>
      <Select
        label="Select account"
        className="max-w-xs"
        {...register("account")}
      >
        {getConnectedAccountIds().map((account) => (
          <SelectItem key={account.toString()}>
            {account.toString()}
          </SelectItem>
        ))}
      </Select>
      <Button
        color="primary"
        startContent={
          <Icon className="pointer-events-none text-2xl" icon="solar:wallet-outline" />
        }
        type="submit"
      >
        Connect
      </Button>
    </form>
  );
};

const ConnectAppForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    hc.openPairingModal();
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <p className="pb-2 text-xl font-medium">Connect wallet</p>
      <Button
        color="primary"
        startContent={
          <Icon className="pointer-events-none text-2xl" icon="token-branded:hedera-hashgraph" />
        }
        type="submit"
      >
        Connect
      </Button>
    </form>
  );
};

const WalletForm = () => {
  const [isConnected, selectAccount] = useAuthStore((state) => [state.isConnected, state.selectAccount]);

  if (isConnected) {
    return (<SelectAccountForm onSelect={(account) => selectAccount(account)} />);
  } else {
    return (<ConnectAppForm />);
  }
};

const Accounts = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-cyan-300 via-orange-200 to-fuchsia-400 p-2 sm:p-4 lg:p-8">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
        <p className="pb-2 text-2xl font-medium">Evercity Forwards App</p>
        <WalletForm />
      </div>
    </div>
  );
};

export default Accounts;
