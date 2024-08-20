"use client";

import type { SidebarItem } from "./Sidebar";

import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, Outlet } from 'react-router-dom';
import { useMediaQuery } from "usehooks-ts";
import {
  User,
  Avatar,
  Button,
  ScrollShadow,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spacer,
  Chip
} from "@nextui-org/react";

import useAuthStore from '../stores/accounts';

import Sidebar from "./Sidebar";

import { hc } from "../helpers/hashconnect";
import { cn } from "../helpers/cn";
import useFetchBalance from '../hooks/useFetchBalance';

const sidebarItems: SidebarItem[] = [
  {
    key: "mascots",
    href: "mascots",
    icon: "ri:nft-line",
    title: "Mascots",
  },
  {
    key: "forwards",
    href: "forwards",
    icon: "solar:widget-2-outline",
    title: "Forwards",
  },
  {
    key: "settings",
    href: "settings",
    icon: "solar:settings-outline",
    title: "Settings",
  },
];

const AppLayout = () => {
  const [
    accountIds,
    currentAccountId,
    selectAccount,
    disconnect
  ] = useAuthStore((state) => [
    state.accountIds,
    state.currentAccountId,
    state.selectAccount,
    state.disconnect
  ]);

  const navigate = useNavigate();
  const isCompact = useMediaQuery("(max-width: 768px)");

  const { balance } = useFetchBalance(currentAccountId);

  return (
    <div className="flex h-dvh w-full">
      <div
        className={cn(
          "relative flex h-full w-72 flex-col !border-r-small border-divider p-6 transition-width",
          {
            "w-16 items-center px-2 py-6": isCompact,
          },
        )}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center">
            <img className="text-background object-fill h-14" src="/evercity_logo.png"/>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Input
            fullWidth
            aria-label="search"
            classNames={{
              base: "px-1",
              inputWrapper: "dark:bg-default-50",
            }}
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
              <Icon
                className="text-default-500 [&>g]:stroke-[2px]"
                icon="solar:magnifer-linear"
                width={18}
              />
            }
          />
        </div>

        <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
          <Sidebar
            defaultSelectedKey="home"
            iconClassName="group-data-[selected=true]:text-primary-foreground"
            itemClasses={{
              base: "data-[selected=true]:bg-primary-400 dark:data-[selected=true]:bg-primary-300 data-[hover=true]:bg-default-300/20 dark:data-[hover=true]:bg-default-200/40",
              title: "group-data-[selected=true]:text-primary-foreground",
            }}
            items={sidebarItems}
          />
          <Spacer y={8} />
          <Card className="mx-2 overflow-visible" shadow="sm">
            <CardBody className="items-center py-5 text-center">
              <h3 className="text-medium font-medium text-default-700">
                Special offer
                <span aria-label="rocket-emoji" className="ml-2" role="img">
                  🚀
                </span>
              </h3>
              <p className="p-4 text-small text-default-500">
                Buy forwards now and grow your mascot faster
              </p>
            </CardBody>
            <CardFooter className="absolute -bottom-8 justify-center">
              <Button className="px-10" color="primary" radius="full" onClick={() => navigate('forwards')}>
                Ok I'm in
              </Button>
            </CardFooter>
          </Card>
        </ScrollShadow>

        <div className="flex justify-center m-2">
          <Chip>
            Balance: {balance?.hBars} HBAR
          </Chip>
        </div>

        <Dropdown placement="top">
          <DropdownTrigger>
            <Button className="mb-4 h-16 items-center justify-between" variant="light">
              <User
                avatarProps={{
                  size: "sm",
                  icon: <Icon
                    icon="token-branded:hedera-hashgraph"
                    width={64}
                  />
                }}
                className="justify-start transition-transform"
                name={currentAccountId?.toString()}
              />
              <Icon className="text-default-400" icon="lucide:chevrons-up-down" width={16} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Account switcher"
            variant="flat"
            onAction={(key) => selectAccount(key.toString())}
          >
            {accountIds.map((account) => (
              <DropdownItem key={account.toString()} textValue={account.toString()}>
                <div className="flex items-center gap-x-3">
                  <Avatar
                    alt={account.toString()}
                    classNames={{
                      base: "flex-shrink-0",
                      img: "transition-none",
                    }}
                    size="sm"
                    icon={
                      <Icon
                        icon="token-branded:hedera-hashgraph"
                        width={64}
                      />
                    }
                  />
                  <div className="flex flex-col">
                    <p className="text-small font-medium text-default-600">{account.toString()}</p>
                  </div>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <div className="mt-auto flex flex-col">
          <Button
            fullWidth
            onClick={() => navigate('/app/help')}
            className="justify-start text-default-500 data-[hover=true]:text-foreground"
            startContent={
              <Icon className="text-default-500" icon="solar:info-circle-line-duotone" width={24} />
            }
            variant="light"
          >
            Help & Information
          </Button>
          <Button
            className="justify-start text-default-500 data-[hover=true]:text-foreground"
            onClick={() => {
              hc.disconnect();
              disconnect();
              navigate('/connect');
            }}
            startContent={
              <Icon
                className="rotate-180 text-default-500"
                icon="solar:minus-circle-line-duotone"
                width={24}
              />
            }
            variant="light"
          >
            Disconnect
          </Button>
        </div>
      </div>
      <div className="w-full flex-1 flex-col p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
