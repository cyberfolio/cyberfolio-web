import { useState, useEffect } from "react";
import "./index.scss";

import classnames from "classnames";
import { toast } from "react-hot-toast";

import CexService from "@services/cex";
import DexService from "@services/dex";

import AssetTable from "@components/asset-table";
import { useAppDispatch, useAppSelector } from "@store/functions";
import { CexAsset, Chain, DexAsset, AllNetworks } from "@customTypes/index";

const Assets = () => {
  const dispatch = useAppDispatch();
  const platform = useAppSelector((state) => state.platform);
  const isAuthenticated = useAppSelector((state) => state.evmAddress);
  const cexAssets = useAppSelector((state) => state.cexAssets);
  const dexAssets = useAppSelector((state) => state.dexAssets);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [filteredDexTokens, setFilteredDexTokens] = useState<DexAsset[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [assetsToShow, setAssetsToShow] = useState<(DexAsset | CexAsset)[]>([]);

  const getAllAssets = async () => {
    try {
      setLoading(true);
      const dexTokensBitcoin = await DexService.getDexTokens({
        chain: Chain.BITCOIN,
      });
      const dexTokensEthereum = await DexService.getDexTokens({
        chain: Chain.ETHEREUM,
      });
      const dexTokensSmartChain = await DexService.getDexTokens({
        chain: Chain.BSC,
      });
      const dexTokensAvalanche = await DexService.getDexTokens({
        chain: Chain.AVALANCHE,
      });
      const dexTokensArbitrum = await DexService.getDexTokens({
        chain: Chain.ARBITRUM,
      });
      const dexTokensPolygon = await DexService.getDexTokens({
        chain: Chain.POLYGON,
      });
      const dexTokenOptimism = await DexService.getDexTokens({
        chain: Chain.OPTIMISM,
      });
      const dexAssets = [];

      if (dexTokensBitcoin?.assets) {
        dexAssets.push(...dexTokensBitcoin.assets);
      }
      if (dexTokensEthereum?.assets) {
        dexAssets.push(...dexTokensEthereum.assets);
      }
      if (dexTokensSmartChain?.assets) {
        dexAssets.push(...dexTokensSmartChain.assets);
      }
      if (dexTokensAvalanche?.assets) {
        dexAssets.push(...dexTokensAvalanche.assets);
      }
      if (dexTokensArbitrum?.assets) {
        dexAssets.push(...dexTokensArbitrum.assets);
      }
      if (dexTokensPolygon?.assets) {
        dexAssets.push(...dexTokensPolygon.assets);
      }
      if (dexTokenOptimism?.assets) {
        dexAssets.push(...dexTokenOptimism.assets);
      }
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
    if (String(platform.name) !== String(AllNetworks.ALLNETWORKS)) {
      const filteredDex = dexAssets.filter((dexToken) => String(dexToken.chain) === String(platform.name));
      const filteredCex = cexAssets.filter((cexToken) => String(cexToken.cexName) === String(platform.name));
      setIsFiltered(true);
      setAssetsToShow([...filteredDex, ...filteredCex]);
    }
    if (String(platform.name) === String(AllNetworks.ALLNETWORKS)) {
      setIsFiltered(false);
      setFilteredDexTokens([]);
    }
  }, [platform, dexAssets, cexAssets]);

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
