import React from "react";
import "./AssetTable.scss";

import classnames from "classnames";

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
                  <div className="asset-table__assets__asset__item asset-table__assets__asset__item--asset asset-table__assets__asset__item--first ">
                    <div>
                      {logo && (
                        <img
                          src={logo}
                          alt={symbol}
                          className="asset-table__assets__asset__item__image"
                        />
                      )}
                      {symbol.toUpperCase()}
                    </div>
                    <div className="asset-table__assets__asset__item__chain">
                      <img
                        src={`http://localhost:4000/logos/${(
                          cexName || chain
                        ).toLowerCase()}.svg`}
                        alt={cexName || chain}
                        className="asset-table__assets__asset__item__chain__logo"
                      />
                      {cexName}
                      {chain}
                    </div>
                  </div>
                  <div className="asset-table__assets__asset__item ">
                    {price}
                  </div>
                  <div className="asset-table__assets__asset__item">
                    {balance}
                  </div>
                  <div className="asset-table__assets__asset__item asset-table__assets__asset__item--center">
                    {walletName}
                  </div>
                  <div className="asset-table__assets__asset__item asset-table__assets__asset__item--last">
                    {value}
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
