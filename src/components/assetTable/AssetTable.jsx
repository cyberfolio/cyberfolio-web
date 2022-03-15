import React from "react";
import "./AssetTable.scss";

import classnames from "classnames";

export const AssetTable = ({ assets, loading }) => {


  return (
    <div className="asset-table">
      <div className="asset-table__header">
        <div className="asset-table__header__item asset-table__header__item--left">
          ASSET
        </div>
        <div className="asset-table__header__item asset-table__header__item--left">
          PRICE
        </div>
        <div className="asset-table__header__item">BALANCE</div>
        <div className="asset-table__header__item asset-table__header__item--right">
          VALUE
        </div>
        <div className="asset-table__header__item">PLACE</div>
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
            ({ name, price, balance, value, place, chain, logo }, index) => {
              return (
                <div
                  key={name + index}
                  className={classnames(
                    "asset-table__assets__asset",
                    index === 0 && "asset-table__assets__asset--first",
                    assets.length - 1 && "asset-table__assets__asset--last"
                  )}
                >
                  <div className="asset-table__assets__asset__item asset-table__assets__asset__item--left">
                    {logo && (
                      <img
                        src={logo}
                        alt={name}
                        className="asset-table__assets__asset__item__image"
                      />
                    )}
                    {name}
                  </div>
                  <div className="asset-table__assets__asset__item asset-table__assets__asset__item--left">
                    $ {price}
                  </div>
                  <div className="asset-table__assets__asset__item">
                    {balance}
                  </div>
                  <div className="asset-table__assets__asset__item asset-table__assets__asset__item--right">
                    {value}
                  </div>
                  <div className="asset-table__assets__asset__item">
                    {place}
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
