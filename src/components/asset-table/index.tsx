import "./index.scss";

import classnames from "classnames";
import utils from "@utils/index";
import { CexAsset, DexAsset } from "@customTypes/index";

export const Index = ({ assets, loading }: { assets: (DexAsset | CexAsset)[]; loading: boolean }) => {
  const openAssetAtScan = (scanUrl: string) => {
    if (scanUrl && utils.isValidHttpUrl(scanUrl)) {
      window.open(scanUrl, "_blank");
    }
  };

  return (
    <div className="asset-table">
      <div className="asset-table__header">
        <div className="asset-table__header__item asset-table__header__item--first">ASSET</div>
        <div className="asset-table__header__item ">PRICE</div>
        <div className="asset-table__header__item">BALANCE</div>
        <div className="asset-table__header__item asset-table__header__item--center">WALLET NAME</div>
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
            const cexName = "";
            let platform = "";
            let balance = 0;
            let walletName = "";
            let price = 0;
            let value = 0;
            if ("platform" in asset) {
              platformImage = utils.platformInfo.filter((info) => info.name === asset.platform)[0]?.image;
              symbol = asset.symbol;
              scan = asset.scan;
              logo = asset.logo;
              platform = asset.platform;
              price = asset.price;
              balance = asset.balance;
              walletName = asset.walletName;
              value = asset.value;
            }
            if ("cexName" in asset) {
              platformImage = utils.platformInfo.filter((info) => info.name === asset.cexName)[0]?.image;
              symbol = asset.symbol;
              logo = asset.logo;
              price = asset.price;
              balance = asset.balance;
              value = asset.value;
            }
            if (!symbol) {
              return <div key={symbol + index}></div>;
            }
            return (
              <div
                key={symbol + index}
                className={classnames(
                  "asset-table__assets__asset",
                  index === 0 && "asset-table__assets__asset--first",
                  assets.length - 1 && "asset-table__assets__asset--last",
                )}
                onClick={() => openAssetAtScan(scan)}
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
                          alt={cexName || platform}
                          className="asset-table__assets__asset__item__chain__logo"
                        />
                      )}
                      {utils.arrangeCexName(cexName)}
                      {utils.capitalizeFirstLetter(platform)}
                    </div>
                  </div>
                </div>
                <div className="asset-table__assets__asset__item ">{utils.toUsd(price)}</div>
                <div className="asset-table__assets__asset__item">{balance}</div>
                <div className="asset-table__assets__asset__item asset-table__assets__asset__item--center">
                  {walletName}
                </div>
                <div className="asset-table__assets__asset__item asset-table__assets__asset__item--last">
                  {utils.toUsd(value)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Index;
