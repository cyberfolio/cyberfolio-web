import { useEffect, useState, useCallback, useRef } from "react";
import "./index.scss";

import { toast } from "react-hot-toast";

import AppHooks from "hooks/index";
import utils from "utils/index";
import InfoService from "services/info";
import { useAppDispatch, useAppSelector } from "store/functions";
import { Cex, Chain, Keys } from "structures/index";

const useHome = () => {
  const dispatch = useAppDispatch();
  const platform = useAppSelector((state) => state.platform);
  const netWorth = useAppSelector((state) => state.netWorth);
  const lastAssetUpdate = useAppSelector((state) => state.lastAssetUpdate);
  const evmAddress = useAppSelector((state) => state.evmAddress);
  const connectedCexes = useAppSelector((state) => state.connectedCexes);
  const connectedWallets = useAppSelector((state) => state.connectedWallets);

  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredWallet, setHoveredWallet] = useState<Chain | undefined>();
  const [lastUpdate, setLastUpdate] = useState<string>();
  const platfromDropdownRef = useRef<HTMLDivElement>(null);

  const checkIfWalletConnected = () => {
    if (!evmAddress) {
      toast.error("Connect your metamask wallet");
      return;
    }
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
    setPlatformDropdownOpen(false);
  }, [platform]);

  useEffect(() => {
    if (evmAddress) {
      getTotal();
      getAvailableAccounts();
    }
  }, [evmAddress, getTotal, getAvailableAccounts]);

  useEffect(() => {
    const updateLastUpdateTime = () => {
      const lastUpdateRes = utils.toReadableDateDifference(new Date(lastAssetUpdate), new Date());
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

  AppHooks.useKeypress(Keys.Escape, () => {
    setPlatformDropdownOpen(false);
  });
  AppHooks.useOnClickOutside(platfromDropdownRef, () => {
    setPlatformDropdownOpen(false);
  });

  const openWalletModal = (chain: Chain) => {
    checkIfWalletConnected();

    dispatch({
      type: "OPEN_WALLET_MODAL",
      payload: {
        open: true,
        chain,
      },
    });
  };

  const openAddCexModal = (name: Cex) => {
    checkIfWalletConnected();
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

  const onAddStockClick = () => {
    checkIfWalletConnected();
  };

  return {
    evmAddress,
    connectedCexes,
    connectedWallets,
    netWorth,
    platform,
    setHoveredWallet,
    platformDropdownOpen,
    hoveredWallet,
    lastUpdate,
    platfromDropdownRef,
    openWalletModal,
    openAddCexModal,
    addMore,
    setPlatformDropdownOpen,
    onAddStockClick,
  };
};

export default useHome;
