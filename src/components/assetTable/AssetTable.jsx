import React from "react";
import "./AssetTable.scss";

import classnames from "classnames";

export const AssetTable = ({ assets, loading }) => {
  return (
    <div className="asset-table">
      <div className="asset-table__header">
        <div className="asset-table__header__item ">ASSET</div>
        <div className="asset-table__header__item ">PRICE</div>
        <div className="asset-table__header__item">BALANCE</div>
        <div className="asset-table__header__item ">VALUE</div>
        <div className="asset-table__header__item">WALLET NAME</div>
        <div className="asset-table__header__item">CHAIN</div>
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
              { name, price, balance, value, chain, logo, walletName },
              index
            ) => {
              return (
                <div
                  key={name + index}
                  className={classnames(
                    "asset-table__assets__asset",
                    index === 0 && "asset-table__assets__asset--first",
                    assets.length - 1 && "asset-table__assets__asset--last"
                  )}
                >
                  <div className="asset-table__assets__asset__item ">
                    {logo && (
                      <img
                        src={logo}
                        alt={name}
                        className="asset-table__assets__asset__item__image"
                      />
                    )}
                    {name}
                  </div>
                  <div className="asset-table__assets__asset__item ">
                    $ {price}
                  </div>
                  <div className="asset-table__assets__asset__item">
                    {balance}
                  </div>
                  <div className="asset-table__assets__asset__item">
                    {value}
                  </div>
                  <div className="asset-table__assets__asset__item">
                    {walletName}
                  </div>
                  <div className="asset-table__assets__asset__item">
                    {chain ? chain : ""}
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
