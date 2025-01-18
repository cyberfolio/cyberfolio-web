import { useState, useEffect, useMemo, useCallback } from "react";
import "./index.scss";

import classnames from "classnames";
import { toast } from "react-hot-toast";

import CexService from "services/cex";
import DexService from "services/dex";

import AppComponents from "components";

import { AllNetworks } from "structures/index";
import AppHooks from "hooks";

enum Tab {
  All = "All",
  DEX = "DEX",
  CEX = "CEX",
  Stocks = "Stocks",
  Accounts = "Accounts",
  CexPaymets = "CexPaymets",
}

const Assets = () => {
  const dispatch = AppHooks.useAppDispatch();
  const platform = AppHooks.useAppSelector((state) => state.platform);
  const isAuthenticated = AppHooks.useAppSelector((state) => state.evmAddress);
  const cexAssets = AppHooks.useAppSelector((state) => state.cexAssets);
  const dexAssets = AppHooks.useAppSelector((state) => state.dexAssets);

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.All);

  const getAllAssets = useCallback(async () => {
    try {
      setIsLoading(true);
      const dexAssets = await DexService.getAllDexTokens();
      dexAssets.assets.sort(function (a, b) {
        return b.value - a.value;
      });
      dispatch({
        type: "SET_DEX_ASSETS",
        payload: dexAssets.assets,
      });

      const cexAssets = await CexService.getCexTokens();
      cexAssets.sort(function (a, b) {
        return b.value - a.value;
      });
      dispatch({
        type: "SET_CEX_ASSETS",
        payload: cexAssets,
      });
      setIsLoading(false);
    } catch (e) {
      toast.error(e.message);
      setIsLoading(false);
    }
  }, [dispatch]);

  const assetsToShow = useMemo(() => {
    if (String(platform.name) !== String(AllNetworks.ALLNETWORKS)) {
      const filteredDex = dexAssets
        .filter((dexAsset) => String(dexAsset.chain) === String(platform.name))
        .sort((a, b) => b.value - a.value);
      const filteredCex = cexAssets
        .filter((cexToken) => String(cexToken.cexName) === String(platform.name))
        .sort((a, b) => b.value - a.value);
      const all = [...filteredCex, ...filteredDex].sort((a, b) => b.value - a.value);
      if (activeTab === "All") {
        return all;
      } else if (activeTab === "CEX") {
        return filteredCex;
      } else if (activeTab === "DEX") {
        return filteredDex;
      } else {
        return all;
      }
    } else if (activeTab === "All") {
      return [...cexAssets, ...dexAssets].sort((a, b) => b.value - a.value);
    } else if (activeTab === "CEX") {
      return cexAssets.sort((a, b) => b.value - a.value);
    } else if (activeTab === "DEX") {
      return dexAssets.sort((a, b) => b.value - a.value);
    } else {
      return [];
    }
  }, [cexAssets, dexAssets, activeTab, platform]);

  const onTabClick = (tabName: Tab) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAllAssets();
    }
  }, [isAuthenticated, getAllAssets]);

  return (
    <div className="assets">
      <div className="assets__links">
        <div
          className={classnames("assets__links__link", activeTab === Tab.All && "assets__links__link--active")}
          onClick={() => onTabClick(Tab.All)}
        >
          All
        </div>
        <div
          className={classnames("assets__links__link", activeTab === Tab.CEX && "assets__links__link--active")}
          onClick={() => onTabClick(Tab.CEX)}
        >
          CEX
        </div>
        <div
          className={classnames("assets__links__link", activeTab === Tab.DEX && "assets__links__link--active")}
          onClick={() => onTabClick(Tab.DEX)}
        >
          DEX
        </div>
        <div
          className={classnames("assets__links__link", activeTab === Tab.Stocks && "assets__links__link--active")}
          onClick={() => onTabClick(Tab.Stocks)}
        >
          Stocks
        </div>
        <div
          className={classnames("assets__links__link", activeTab === Tab.Accounts && "assets__links__link--active")}
          onClick={() => onTabClick(Tab.Accounts)}
        >
          Accounts
        </div>

        <div
          className={classnames("assets__links__link", activeTab === Tab.CexPaymets && "assets__links__link--active")}
          onClick={() => onTabClick(Tab.CexPaymets)}
        >
          Payment History
        </div>
      </div>
      <div className="assets__table">
        {activeTab !== Tab.Accounts && activeTab !== Tab.CexPaymets && (
          <AppComponents.AssetTable assets={assetsToShow} isLoading={isLoading} />
        )}
        {activeTab === Tab.Accounts && <AppComponents.Accounts />}
        <AppComponents.CexPayments show={activeTab === Tab.CexPaymets} />
      </div>
    </div>
  );
};

export default Assets;
