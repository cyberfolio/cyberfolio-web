import React, { useState, useEffect } from "react";
import "./Assets.scss";

import classnames from "classnames";
import { toast } from "react-toastify";

import { getDexTokens, getCexTokens } from "../../services/AssetService";
import { AssetTable } from "../assetTable/AssetTable";
import { useSelector } from "react-redux";

export const Assets = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [dexTokens, setDexTokens] = useState([]);
  const [filteredDexTokens, setFilteredDexTokens] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [cexTokens, setCexTokens] = useState([]);
  const [assetsToShow, setAssetsToShow] = useState([]);

  const chain = useSelector((state) => state.chain);

  const getAllAssets = async () => {
    try {
      setLoading(true);
      const dexTokensBitcoin = await getDexTokens({ chain: "Bitcoin" });
      const dexTokensEthereum = await getDexTokens({ chain: "Ethereum" });
      const dexTokensAvalanche = await getDexTokens({ chain: "Avalanche" });
      const dexTokensArbitrum = await getDexTokens({ chain: "Arbitrum" });
      const dexTokensPolygon = await getDexTokens({ chain: "Polygon" });
      const dexTokensSmartChain = await getDexTokens({ chain: "SmartChain" });

      setDexTokens([
        ...dexTokensBitcoin,
        ...dexTokensEthereum,
        ...dexTokensAvalanche,
        ...dexTokensArbitrum,
        ...dexTokensPolygon,
        ...dexTokensSmartChain,
      ]);
      setLoading(false);

      const cexTokens = getCexTokens();
      setCexTokens(cexTokens);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

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
    getAllAssets();
  }, []);

  useEffect(() => {
    if (chain.name !== "All Networks") {
      const filtered = dexTokens.filter(
        (dexToken) => dexToken.chain === chain.name
      );
      setIsFiltered(true);
      setFilteredDexTokens(filtered);
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
