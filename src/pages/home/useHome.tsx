import { useEffect, useState, useCallback } from "react";
import "./index.scss";

import { toast } from "react-hot-toast";

import AppUtils from "utils/index";
import InfoService from "services/info";
import AppStructures from "structures/index";
import AppHooks from "hooks/index";

const useHome = () => {
  const dispatch = AppHooks.useAppDispatch();
  const netWorth = AppHooks.useAppSelector((state) => state.netWorth);
  const lastAssetUpdate = AppHooks.useAppSelector((state) => state.lastAssetUpdate);
  const evmAddress = AppHooks.useAppSelector((state) => state.evmAddress);
  const connectedCexes = AppHooks.useAppSelector((state) => state.connectedCexes);
  const connectedWallets = AppHooks.useAppSelector((state) => state.connectedWallets);

  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);
  const [hoveredWallet, setHoveredWallet] = useState<AppStructures.Chain | undefined>();
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

  const addMore = (chain: AppStructures.Chain) => {
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
    addMore,
    setIsPlatformDropdownOpen,
    onPlatformClick,
  };
};

export default useHome;
