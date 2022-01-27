import React, { useState, useEffect } from "react";
import "./Assets.scss";

import classnames from "classnames";

import { getDexTokens, getCexTokens } from "../../services/AssetService";
import { AssetTable } from "../asset-table/AssetTable";

export const Assets = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [dexTokens, setDexTokens] = useState([]);
  const [cexTokens, setCexTokens] = useState([]);



  const getAllAssets = () => {
    const dexTokens = getDexTokens();
    const cexTokens = getCexTokens();
    setDexTokens(dexTokens);
    setCexTokens(cexTokens);
  };

  const assetsToShow = () => {
    if (activeTab === "All") {
      return [...dexTokens, ...cexTokens];
    }
    if (activeTab === "CEX") {
      return cexTokens;
    }
    if (activeTab === "DEX") {
      return dexTokens;
    }
  };

  const onTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    getAllAssets();
  }, []);

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
            activeTab === "NFTs" && "assets__links__link--active"
          )}
          onClick={() => onTabClick("NFTs")}
        >
          NFTs
        </div>
      </div>
      <div className="assets__table">
        <AssetTable assets={assetsToShow()} />
      </div>
    </div>
  );
};
