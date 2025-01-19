import React from "react";
import "./index.scss";

import classnames from "classnames";
import AppUtils from "utils/index";
import { Cex, CexAsset, Chain, DexAsset } from "structures/index";
import AppHooks from "hooks";

interface AssetTableProps {
  assets: (DexAsset | CexAsset)[];
  isLoading: boolean;
}

const AssetTable: React.FC<AssetTableProps> = ({ assets, isLoading }) => {
  const selectedPlatform = AppHooks.useAppSelector((state) => state.platform);
  const evmAddress = AppHooks.useAppSelector((state) => state.evmAddress);

  const assetss = [...assets];

  return (
    <div className="asset-table">
      <div className="asset-table__header">
        <div className="asset-table__header__item asset-table__header__item--first">ASSET</div>
        <div className="asset-table__header__item ">PRICE</div>
        <div className="asset-table__header__item">BALANCE</div>
        <div className="asset-table__header__item asset-table__header__item--center">WALLET/ACCOUNT</div>
        <div className="asset-table__header__item asset-table__header__item--last">VALUE</div>
      </div>
      <div className="asset-table__assets">
        {isLoading && (
          <div className="asset-table__assets__loading">
            <div className="fa-3x">
              <i className="fas fa-sync fa-spin asset-table__assets__loading--white"></i>
            </div>
          </div>
        )}
        {assetss &&
          assetss.map((asset, index: number) => {
            let platformImage = "";
            let symbol = "";
            let scan = "";
            let logo = "";
            let cexName = Cex.NO;
            let chain = Chain.NO;
            let balance = 0;
            let walletName = "";
            let accountName = "";
            let price = 0;
            let value = 0;
            if ("chain" in asset) {
              platformImage = AppUtils.chainInfo.filter((info) => info.name === asset.chain)[0]?.image;
              chain = asset.chain;
              symbol = asset.symbol;
              scan = asset.scan;
              logo = asset.logo;
              price = asset.price;
              balance = asset.balance;
              walletName = asset.walletName;
              value = asset.value;
            }
            if ("cexName" in asset) {
              cexName = asset.cexName;
              platformImage = AppUtils.cexInfo.filter((info) => info.name === asset.cexName)[0]?.image;
              symbol = asset.symbol;
              logo = asset.logo;
              price = asset.price;
              balance = asset.balance;
              accountName = asset.accountName;
              value = asset.value;
            }
            if (!symbol) {
              return <div key={symbol + index}></div>;
            }
            return (
              <a
                key={symbol + index}
                className={classnames(
                  "asset-table__assets__asset",
                  index === 0 && "asset-table__assets__asset--first",
                  assets.length - 1 && "asset-table__assets__asset--last",
                )}
                href={scan}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="asset-table__assets__asset__item 
                                asset-table__assets__asset__item--asset 
                                asset-table__assets__asset__item--first"
                >
                  {logo && <img src={logo} alt={symbol} className="asset-table__assets__asset__item__image" />}

                  {!logo && (
                    <div className="asset-table__assets__asset__item__noimage">{symbol.toUpperCase().slice(0, 3)}</div>
                  )}
                  <div className="asset-table__assets__asset__item__chain">
                    <div className="asset-table__assets__asset__item__chain__name">{symbol.toUpperCase()}</div>
                    <div className="asset-table__assets__asset__item__chain__area">
                      {!platformImage && (
                        <div className="asset-table__assets__asset__item__noimage">
                          {symbol.toUpperCase().slice(0, 3)}
                        </div>
                      )}
                      {platformImage && (
                        <img
                          src={platformImage}
                          alt={cexName || chain}
                          className="asset-table__assets__asset__item__chain__logo"
                        />
                      )}
                      {cexName !== Cex.NO && AppUtils.arrangeCexName(cexName)}
                      {chain !== Chain.NO && AppUtils.capitalizeFirstLetter(chain)}
                    </div>
                  </div>
                </div>
                <div className="asset-table__assets__asset__item ">{AppUtils.toUsd(price)}</div>
                <div className="asset-table__assets__asset__item">{Intl.NumberFormat("en-US").format(balance)}</div>
                <div className="asset-table__assets__asset__item asset-table__assets__asset__item--center">
                  {walletName} {accountName}
                </div>
                <div className="asset-table__assets__asset__item asset-table__assets__asset__item--last">
                  {AppUtils.toUsd(value)}
                </div>
              </a>
            );
          })}
        {!isLoading && assets && assets.length === 0 && selectedPlatform && evmAddress && (
          <div className="asset-table__assets__empty">
            <div className="asset-table__assets__empty__text">
              No assets in {selectedPlatform.name}
              <img
                className="asset-table__assets__empty__image"
                alt={selectedPlatform.name}
                src={selectedPlatform.image}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(AssetTable);
