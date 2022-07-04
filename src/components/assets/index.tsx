import { useState, useEffect, useMemo, useCallback } from "react";
import "./index.scss";

import classnames from "classnames";
import { toast } from "react-hot-toast";

import CexService from "@services/cex";
import DexService from "@services/dex";

import AssetTable from "@components/asset-table";
import { useAppDispatch, useAppSelector } from "@store/functions";
import { AllNetworks } from "@customTypes/index";

const Assets = () => {
  const dispatch = useAppDispatch();
  const platform = useAppSelector((state) => state.platform);
  const isAuthenticated = useAppSelector((state) => state.evmAddress);
  const cexAssets = useAppSelector((state) => state.cexAssets);
  const dexAssets = useAppSelector((state) => state.dexAssets);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const getAllAssets = useCallback(async () => {
    try {
      setLoading(true);
      const dexAssets = await DexService.getAllDexTokens();
      dexAssets.assets.sort(function (a, b) {
        return b.value - a.value;
      });
      dispatch({
        type: "SET_DEX_ASSETS",
        payload: {
          data: dexAssets.assets,
        },
      });

      const cexAssets = await CexService.getCexTokens();
      cexAssets.sort(function (a, b) {
        return b.value - a.value;
      });
      dispatch({
        type: "SET_CEX_ASSETS",
        payload: {
          data: cexAssets,
        },
      });
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  }, [dispatch]);

  const assetsToShow = useMemo(() => {
    if (String(platform.name) !== String(AllNetworks.ALLNETWORKS)) {
      const filteredDex = dexAssets.filter((dexAsset) => String(dexAsset.chain) === String(platform.name));
      const filteredCex = cexAssets.filter((cexToken) => String(cexToken.cexName) === String(platform.name));
      if (activeTab === "All") {
        return [...filteredCex, ...filteredDex];
      } else if (activeTab === "CEX") {
        return filteredCex;
      } else if (activeTab === "DEX") {
        return filteredDex;
      } else {
        return [...filteredCex, ...filteredDex];
      }
    } else if (activeTab === "All") {
      return [...cexAssets, ...dexAssets];
    } else if (activeTab === "CEX") {
      return cexAssets;
    } else if (activeTab === "DEX") {
      return dexAssets;
    } else {
      return [];
    }
  }, [cexAssets, dexAssets, activeTab, platform]);

  const onTabClick = (tabName: string) => {
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
          className={classnames("assets__links__link", activeTab === "All" && "assets__links__link--active")}
          onClick={() => onTabClick("All")}
        >
          All
        </div>
        <div
          className={classnames("assets__links__link", activeTab === "CEX" && "assets__links__link--active")}
          onClick={() => onTabClick("CEX")}
        >
          CEX
        </div>
        <div
          className={classnames("assets__links__link", activeTab === "DEX" && "assets__links__link--active")}
          onClick={() => onTabClick("DEX")}
        >
          DEX
        </div>
      </div>
      <div className="assets__table">
        <AssetTable assets={assetsToShow} loading={loading} />
      </div>
    </div>
  );
};

export default Assets;
