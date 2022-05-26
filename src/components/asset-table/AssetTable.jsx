import React from "react";
import "./AssetTable.scss";

import classnames from "classnames";
import { arrangeCexName, capitalizeFirstLetter, toUsd, logos } from "../../utils";

export const AssetTable = ({ assets, loading }) => {

  return (
    <div className="asset-table">
      <div className="asset-table__header">
        <div className="asset-table__header__item asset-table__header__item--first">
          ASSET
        </div>
        <div className="asset-table__header__item ">PRICE</div>
        <div className="asset-table__header__item">BALANCE</div>
        <div className="asset-table__header__item asset-table__header__item--center">
          WALLET NAME
        </div>
        <div className="asset-table__header__item asset-table__header__item--last">
          VALUE
        </div>
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
          assets.map(
            (
              {
                name,
                symbol,
                price,
                balance,
                value,
                chain,
                logo,
                walletName,
                cexName,
              },
              index
            ) => {
              if (!symbol) {
                return <div key={name + index}></div>;
              }
              return (
                <div
                  key={name + index}
                  className={classnames(
                    "asset-table__assets__asset",
                    index === 0 && "asset-table__assets__asset--first",
                    assets.length - 1 && "asset-table__assets__asset--last"
                  )}
                >
                  <div
                    className="asset-table__assets__asset__item 
                                asset-table__assets__asset__item--asset 
                                asset-table__assets__asset__item--first"
                  >
                    {logo && (
                      <img
                        src={logo}
                        alt={symbol}
                        className="asset-table__assets__asset__item__image"
                      />
                    )}

                    {!logo && (
                      <div className="asset-table__assets__asset__item__noimage">
                        {symbol.toUpperCase().slice(0, 3)}
                      </div>
                    )}
                    <div className="asset-table__assets__asset__item__chain">
                      <div className="asset-table__assets__asset__item__chain__name">
                        {symbol.toUpperCase()}
                      </div>
                      <div className="asset-table__assets__asset__item__chain__area">
                        <img
                          src={`${logos[cexName || chain]}`}
                          alt={cexName || chain}
                          className="asset-table__assets__asset__item__chain__logo"
                        />
                        {arrangeCexName(cexName)}
                        {capitalizeFirstLetter(chain)}
                      </div>
                    </div>
                  </div>
                  <div className="asset-table__assets__asset__item ">
                    {toUsd(price)}
                  </div>
                  <div className="asset-table__assets__asset__item">
                    {balance}
                  </div>
                  <div className="asset-table__assets__asset__item asset-table__assets__asset__item--center">
                    {walletName}
                  </div>
                  <div className="asset-table__assets__asset__item asset-table__assets__asset__item--last">
                    {toUsd(value)}
                  </div>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

AssetTable.whyDidYouRender = true;
