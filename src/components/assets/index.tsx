import { useState, useEffect, useMemo, useCallback } from "react";
import "./index.scss";

import classnames from "classnames";
import { toast } from "react-hot-toast";

import CexService from "@services/cex";
import DexService from "@services/dex";

import AssetTable from "@components/asset-table";
import Accounts from "@components/accounts";
import CexPayments from "@components/cex-payments";

import { useAppDispatch, useAppSelector } from "@store/functions";
import { AllNetworks } from "@app-types/index";

enum Tab {
  All = "All",
  DEX = "DEX",
  CEX = "CEX",
  Accounts = "Accounts",
  CexPaymets = "CexPaymets",
}

const Assets = () => {
  const dispatch = useAppDispatch();
  const platform = useAppSelector((state) => state.platform);
  const isAuthenticated = useAppSelector((state) => state.evmAddress);
  const cexAssets = useAppSelector((state) => state.cexAssets);
  const dexAssets = useAppSelector((state) => state.dexAssets);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.All);

  const getAllAssets = useCallback(async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
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
          <AssetTable assets={assetsToShow} loading={loading} />
        )}
        {activeTab === Tab.Accounts && <Accounts />}
        <CexPayments show={activeTab === Tab.CexPaymets} />
      </div>
    </div>
  );
};

export default Assets;
