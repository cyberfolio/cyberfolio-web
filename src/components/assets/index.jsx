import React, { useState, useEffect } from "react";
import "./index.scss";

import classnames from "classnames";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import CexService from "../../services/cex";
import DexService from "../../services/dex";
import InfoService from "../../services/info";
import { ACTIONS } from "../../store/actions";

import AssetTable from "../asset-table";

const Assets = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [dexTokens, setDexTokens] = useState([]);
  const [filteredDexTokens, setFilteredDexTokens] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [cexTokens, setCexTokens] = useState([]);
  const [assetsToShow, setAssetsToShow] = useState([]);

  const chain = useSelector((state) => state.chain);
  const isAuthenticated = useSelector((state) => state.evmAddress);
  const dispatch = useDispatch()

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

      const cexTokens = await CexService.getCexTokens();
      cexTokens.sort(function (a, b) {
        return b.value - a.value;
      });
      setCexTokens(cexTokens);

      try {
        const netWorth = await InfoService.getNetWorth();
        dispatch({
          type: ACTIONS.SET_NET_WORTH,
          payload: {
            data: netWorth
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
