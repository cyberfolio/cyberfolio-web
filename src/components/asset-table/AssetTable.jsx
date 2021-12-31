import React from "react";
import "./AssetTable.scss";

const assets = [
  {
    name: "KLO",
    price: 4000,
    balance: 10,
    value: 40000,
    place: "wallet1",
  },
  {
    name: "CRA",
    price: 0.8,
    balance: 2400,
    value: 2000,
    place: "wallet2",
  },
  {
    name: "IME",
    price: 0.04,
    balance: 24027,
    value: 846,
    place: "wallet3",
  },
  {
    name: "PTP",
    price: 1.95,
    balance: 356.1645,
    value: 693,
    place: "wallet2",
  },
];

export const AssetTable = () => {
  return (
    <div className="asset-table">
      <div className="asset-table__header">
        <div className="asset-table__header__item">ASSET</div>
        <div className="asset-table__header__item">PRICE</div>
        <div className="asset-table__header__item">BALANCE</div>
        <div className="asset-table__header__item">VALUE</div>
        <div className="asset-table__header__item">PLACE</div>
      </div>
      <div className="asset-table__assets">
        {assets.map(({ name, price, balance, value, place }, index) => {
          return (
            <div
              className={`asset-table__assets__asset ${
                index === 0 ? "asset-table__assets__asset--first" :
                index === assets.length - 1 ? "asset-table__assets__asset--last" : ""
              }`}
            >
              <div className="asset-table__assets__asset__item">{name}</div>
              <div className="asset-table__assets__asset__item">{price}</div>
              <div className="asset-table__assets__asset__item">{balance}</div>
              <div className="asset-table__assets__asset__item">{value}</div>
              <div className="asset-table__assets__asset__item">{place}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
