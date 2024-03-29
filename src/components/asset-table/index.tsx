import "./index.scss";

import classnames from "classnames";
import utils from "@utils/index";
import { Cex, CexAsset, Chain, DexAsset } from "@app-types/index";
import { memo } from "react";

const Index = ({ assets, loading }: { assets: (DexAsset | CexAsset)[]; loading: boolean }) => {
  // const openAssetAtScan = (scanUrl: string) => {
  //   if (scanUrl && utils.isValidHttpUrl(scanUrl)) {
  //     window.open(scanUrl, "_blank");
  //   }
  // };

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
        {loading && (
          <div className="asset-table__assets__loading">
            <div className="fa-3x">
              <i className="fas fa-sync fa-spin asset-table__assets__loading--white"></i>
            </div>
          </div>
        )}
        {assets &&
          assets.map((asset, index: number) => {
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
              platformImage = utils.chainInfo.filter((info) => info.name === asset.chain)[0]?.image;
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
              platformImage = utils.cexInfo.filter((info) => info.name === asset.cexName)[0]?.image;
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
                      {cexName !== Cex.NO && utils.arrangeCexName(cexName)}
                      {chain !== Chain.NO && utils.capitalizeFirstLetter(chain)}
                    </div>
                  </div>
                </div>
                <div className="asset-table__assets__asset__item ">{utils.toUsd(price)}</div>
                <div className="asset-table__assets__asset__item">{Intl.NumberFormat("en-US").format(balance)}</div>
                <div className="asset-table__assets__asset__item asset-table__assets__asset__item--center">
                  {walletName} {accountName}
                </div>
                <div className="asset-table__assets__asset__item asset-table__assets__asset__item--last">
                  {utils.toUsd(value)}
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default memo(Index);
