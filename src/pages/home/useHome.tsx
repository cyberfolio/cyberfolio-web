import { useEffect, useState, useCallback } from "react";
import "./index.module.scss";

import { toast } from "react-hot-toast";

import AppUtils from "utils/index";
import InfoService from "services/info";
import { Cex, Chain } from "structures/index";
import AppHooks from "hooks";

const useHome = () => {
  const dispatch = AppHooks.useAppDispatch();
  const netWorth = AppHooks.useAppSelector((state) => state.netWorth);
  const lastAssetUpdate = AppHooks.useAppSelector((state) => state.lastAssetUpdate);
  const evmAddress = AppHooks.useAppSelector((state) => state.evmAddress);
  const connectedCexes = AppHooks.useAppSelector((state) => state.connectedCexes);
  const connectedWallets = AppHooks.useAppSelector((state) => state.connectedWallets);

  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);
  const [hoveredWallet, setHoveredWallet] = useState<Chain | undefined>();
  const [lastUpdate, setLastUpdate] = useState<string>();

  const isWalletConnected = () => {
    return Boolean(evmAddress) === true;
  };

  const getTotal = useCallback(async () => {
    try {
      const netWorth = await InfoService.getNetWorth();
      dispatch({
        type: "SET_NET_WORTH",
        payload: netWorth,
      });
    } catch (e) {
      if (e.status !== 401) {
        toast.error(e.message);
      }
    }
  }, [dispatch]);

  const getAvailableAccounts = useCallback(async () => {
    try {
      const { cexes, wallets } = await InfoService.getConnectedAccounts();
      dispatch({
        type: "SET_CONNECTED_CEXES",
        payload: cexes,
      });
      dispatch({
        type: "SET_CONNECTED_WALLETS",
        payload: wallets,
      });
    } catch (e) {
      if (e.status !== 401) {
        toast.error(e.message);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (evmAddress) {
      getTotal();
      getAvailableAccounts();
    }
  }, [evmAddress, getTotal, getAvailableAccounts]);

  useEffect(() => {
    const updateLastUpdateTime = () => {
      const lastUpdateRes = AppUtils.toReadableDateDifference(new Date(lastAssetUpdate), new Date());
      setLastUpdate(lastUpdateRes);
    };
    updateLastUpdateTime();
    const interval = setInterval(() => {
      updateLastUpdateTime();
    }, 58000);
    return () => {
      clearInterval(interval);
    };
  }, [lastAssetUpdate]);

  const openWalletModal = (chain: Chain) => {
    const isConnected = isWalletConnected();
    if (!isConnected) {
      toast.error("Connect your wallet");
      return;
    }

    dispatch({
      type: "OPEN_WALLET_MODAL",
      payload: {
        open: true,
        chain,
      },
    });
  };

  const openAddCexModal = (name: Cex) => {
    const isConnected = isWalletConnected();
    if (!isConnected) {
      toast.error("Connect your wallet");
      return;
    }

    if (connectedCexes.some((connectedCex) => connectedCex.name === name)) return;
    if (evmAddress) {
      dispatch({
        type: "OPEN_ADD_CEX_MODAL",
        payload: {
          open: true,
          name,
        },
      });
    }
  };

  const addMore = (chain: Chain) => {
    if (connectedWallets.some((wallet) => wallet.chain === chain)) {
      setHoveredWallet(chain);
    }
  };

  const onPlatformClick = ({ name, image }: { name: string; image: string }) => {
    dispatch({
      type: "FILTER_ASSETS_BY_PLATFORM",
      payload: {
        platform: name,
        image,
      },
    });
  };

  return {
    evmAddress,
    connectedCexes,
    connectedWallets,
    netWorth,
    setHoveredWallet,
    isPlatformDropdownOpen,
    hoveredWallet,
    lastUpdate,
    openWalletModal,
    openAddCexModal,
    addMore,
    setIsPlatformDropdownOpen,
    onPlatformClick,
  };
};

export default useHome;
