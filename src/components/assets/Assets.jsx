import React, { useState, useEffect } from "react";
import "./Assets.scss";

import classnames from "classnames";
import { toast } from "react-toastify";

import { getCexTokens, getDexTokens } from "../../services/asset";
import { AssetTable } from "../assetTable/AssetTable";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../../state/actions";

export const Assets = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [dexTokens, setDexTokens] = useState([]);
  const [filteredDexTokens, setFilteredDexTokens] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [cexTokens, setCexTokens] = useState([]);
  const [assetsToShow, setAssetsToShow] = useState([]);
  const [netWorth, setNetWorth] = useState(0);

  const chain = useSelector((state) => state.chain);
  const cexAssets = useSelector((state) => state.cexAssets);
  const isAuthenticated = useSelector((state) => state.evmAddress);
  const dispatch = useDispatch((state) => state.evmAddress);


  const getAllAssets = async () => {
    try {
      setLoading(true);
      const dexTokensBitcoin = await getDexTokens({ chain: "Bitcoin" });
      dispatch({
        type: ACTIONS.ADD_NET_WORTH,
        payload: {
          data: dexTokensBitcoin?.totalTokenValue,
        },
      });
      const dexTokensEthereum = await getDexTokens({ chain: "Ethereum" });
      dispatch({
        type: ACTIONS.ADD_NET_WORTH,
        payload: {
          data: dexTokensEthereum?.totalTokenValue,
        },
      });
      const dexTokensAvalanche = await getDexTokens({ chain: "Avalanche" });
      dispatch({
        type: ACTIONS.ADD_NET_WORTH,
        payload: {
          data: dexTokensAvalanche?.totalTokenValue,
        },
      });
      const dexTokensArbitrum = await getDexTokens({ chain: "Arbitrum" });
      dexTokensArbitrum?.totalTokenValue && setNetWorth(netWorth + dexTokensArbitrum?.totalTokenValue)
      dispatch({
        type: ACTIONS.ADD_NET_WORTH,
        payload: {
          data: dexTokensArbitrum?.totalTokenValue,
        },
      });
      const dexTokensPolygon = await getDexTokens({ chain: "Polygon" });
      dexTokensPolygon?.totalTokenValue && setNetWorth(netWorth + dexTokensPolygon?.totalTokenValue)
      dispatch({
        type: ACTIONS.ADD_NET_WORTH,
        payload: {
          data: dexTokensPolygon?.totalTokenValue,
        },
      });
      const dexTokensSmartChain = await getDexTokens({ chain: "SmartChain" });
      dexTokensSmartChain?.totalTokenValue && setNetWorth(netWorth + dexTokensSmartChain?.totalTokenValue)
      dispatch({
        type: ACTIONS.ADD_NET_WORTH,
        payload: {
          data: dexTokensSmartChain?.totalTokenValue,
        },
      });
      const dexTokens = [
        ...dexTokensBitcoin?.assets,
        ...dexTokensEthereum?.assets,
        ...dexTokensAvalanche?.assets,
        ...dexTokensArbitrum?.assets,
        ...dexTokensPolygon?.assets,
        ...dexTokensSmartChain?.assets,
      ];
      dexTokens.sort(function (a, b) {
        return b.value - a.value;
      });
      setDexTokens(dexTokens);

      const cexTokensBinance = await getCexTokens({ cexName: "binance" });
      cexTokensBinance.sort(function (a, b) {
        return b.value - a.value;
      });
      const cexTokensGate = await getCexTokens({ cexName: "gateio" });
      cexTokensGate.sort(function (a, b) {
        return b.value - a.value;
      });
      setCexTokens([...cexTokensBinance, ...cexTokensGate]);
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Array.isArray(cexAssets) && cexAssets.length > 0) {
      setCexTokens(cexAssets);
    }
  }, [cexAssets]);

  useEffect(() => {
    if (activeTab === "All" && filteredDexTokens.length > 0 && isFiltered) {
      setAssetsToShow([...filteredDexTokens, ...cexTokens]);
    }
    if (activeTab === "All" && filteredDexTokens.length === 0 && !isFiltered) {
      setAssetsToShow([...dexTokens, ...cexTokens]);
    }
    if (activeTab === "All" && filteredDexTokens.length === 0 && isFiltered) {
      setAssetsToShow([]);
    }
    if (activeTab === "CEX") {
      setAssetsToShow(cexTokens);
    }
    if (activeTab === "DEX" && filteredDexTokens.length === 0 && !isFiltered) {
      setAssetsToShow(dexTokens);
    }
    if (activeTab === "DEX" && filteredDexTokens.length === 0 && isFiltered) {
      setAssetsToShow([]);
    }
    if (activeTab === "DEX" && filteredDexTokens.length > 0) {
      setAssetsToShow(filteredDexTokens);
    }
  }, [activeTab, dexTokens, filteredDexTokens, cexTokens, isFiltered]);

  const onTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAllAssets();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (chain.name !== "All Networks") {
      const filteredDex = dexTokens.filter(
        (dexToken) => dexToken.chain === chain.name
      );
      const filteredCex = cexTokens.filter(
        (ceToken) => ceToken.cexName === chain.name
      );
      setIsFiltered(true);
      setFilteredDexTokens([...filteredDex, ...filteredCex]);
    }
    if (chain.name === "All Networks") {
      setIsFiltered(false);
      setFilteredDexTokens([]);
    }
  }, [chain, dexTokens, cexTokens]);

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
        <div
          className={classnames(
            "assets__links__link",
            activeTab === "Pools" && "assets__links__link--active"
          )}
          onClick={() => onTabClick("Pools")}
        >
          Pools
        </div>
      </div>
      <div className="assets__table">
        <AssetTable assets={assetsToShow} loading={loading} />
      </div>
    </div>
  );
};

Assets.whyDidYouRender = true;
