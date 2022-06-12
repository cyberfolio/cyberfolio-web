import { useState, useEffect } from "react";
import "./index.scss";

import classnames from "classnames";
import toast from "react-hot-toast";

import CexService from "../../services/cex";
import DexService from "../../services/dex";
import InfoService from "../../services/info";

import AssetTable from "../asset-table";
import { useAppDispatch, useAppSelector } from "../../store";

const Assets = () => {
  const dispatch = useAppDispatch();
  const platform = useAppSelector((state) => state.platform);
  const isAuthenticated = useAppSelector((state) => state.evmAddress);
  const cexAssets = useAppSelector((state) => state.cexAssets);
  const dexAssets = useAppSelector((state) => state.dexAssets);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [filteredDexTokens, setFilteredDexTokens] = useState([] as any);
  const [isFiltered, setIsFiltered] = useState(false);
  const [assetsToShow, setAssetsToShow] = useState([] as any);

  const getAllAssets = async () => {
    try {
      setLoading(true);
      const dexTokensBitcoin = await DexService.getDexTokens({
        chain: "Bitcoin",
      });
      const dexTokensEthereum = await DexService.getDexTokens({
        chain: "Ethereum",
      });
      const dexTokensAvalanche = await DexService.getDexTokens({
        chain: "Avalanche",
      });
      const dexTokensArbitrum = await DexService.getDexTokens({
        chain: "Arbitrum",
      });
      const dexTokensPolygon = await DexService.getDexTokens({
        chain: "Polygon",
      });
      const dexTokensSmartChain = await DexService.getDexTokens({
        chain: "SmartChain",
      });

      const dexAssets = [
        ...dexTokensBitcoin?.assets,
        ...dexTokensEthereum?.assets,
        ...dexTokensAvalanche?.assets,
        ...dexTokensArbitrum?.assets,
        ...dexTokensPolygon?.assets,
        ...dexTokensSmartChain?.assets,
      ];
      dexAssets.sort(function (a, b) {
        return b.value - a.value;
      });
      dispatch({
        type: "SET_DEX_ASSETS",
        payload: {
          data: dexAssets,
        },
      });

      const cexAssets = await CexService.getCexTokens();
      cexAssets.sort(function (a: any, b: any) {
        return b.value - a.value;
      });
      dispatch({
        type: "SET_CEX_ASSETS",
        payload: {
          data: cexAssets,
        },
      });

      try {
        const netWorth = await InfoService.getNetWorth();
        dispatch({
          type: "SET_NET_WORTH",
          payload: {
            data: netWorth,
          },
        });
      } catch (e) {
        if (e.status !== 401) {
          toast.error(e.message);
        }
      }
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "All" && filteredDexTokens.length > 0 && isFiltered) {
      setAssetsToShow([...filteredDexTokens, ...cexAssets]);
    }
    if (activeTab === "All" && filteredDexTokens.length === 0 && !isFiltered) {
      setAssetsToShow([...dexAssets, ...cexAssets]);
    }
    if (activeTab === "All" && filteredDexTokens.length === 0 && isFiltered) {
      setAssetsToShow([]);
    }
    if (activeTab === "CEX") {
      setAssetsToShow(cexAssets);
    }
    if (activeTab === "DEX" && filteredDexTokens.length === 0 && !isFiltered) {
      setAssetsToShow(dexAssets);
    }
    if (activeTab === "DEX" && filteredDexTokens.length === 0 && isFiltered) {
      setAssetsToShow([]);
    }
    if (activeTab === "DEX" && filteredDexTokens.length > 0) {
      setAssetsToShow(filteredDexTokens);
    }
  }, [activeTab, dexAssets, filteredDexTokens, cexAssets, isFiltered]);

  const onTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAllAssets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (platform.name.toLowerCase() !== "all networks") {
      const filteredDex = dexAssets.filter(
        (dexToken) => dexToken.platform === platform.name
      );
      const filteredCex = cexAssets.filter(
        (ceToken) => ceToken.cexName === platform.name
      );
      setIsFiltered(true);
      setFilteredDexTokens([...filteredDex, ...filteredCex]);
    }
    if (platform.name.toLowerCase() === "all networks") {
      setIsFiltered(false);
      setFilteredDexTokens([]);
    }
  }, [platform, dexAssets, cexAssets]);

  return (
    <div className="assets">
      <div className="assets__links">
        <div
          className={classnames(
            "assets__links__link",
            activeTab === "All" && "assets__links__link--active"
          )}
          onClick={() => onTabClick("All")}
        >
          All
        </div>
        <div
          className={classnames(
            "assets__links__link",
            activeTab === "CEX" && "assets__links__link--active"
          )}
          onClick={() => onTabClick("CEX")}
        >
          CEX
        </div>
        <div
          className={classnames(
            "assets__links__link",
            activeTab === "DEX" && "assets__links__link--active"
          )}
          onClick={() => onTabClick("DEX")}
        >
          DEX
        </div>
        {/*
        <div
          className={classnames(
            "assets__links__link",
            activeTab === "Pools" && "assets__links__link--active"
          )}
          onClick={() => onTabClick("Pools")}
        >
          Pools
        </div>
        <div
          className={classnames(
            "assets__links__link",
            activeTab === "Connected Accounts" && "assets__links__link--active"
          )}
          onClick={() => onTabClick("Connected Accounts")}
        >
          Connected Accounts
        </div>
      */}
      </div>
      <div className="assets__table">
        <AssetTable assets={assetsToShow} loading={loading} />
      </div>
    </div>
  );
};

export default Assets;
