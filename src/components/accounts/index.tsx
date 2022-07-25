import { useAppSelector } from "@store/functions";
import utils from "@utils/index";
import "./index.scss";

const Accounts = () => {
  const connectedCexes = useAppSelector((state) => state.connectedCexes);
  const connectedWallets = useAppSelector((state) => state.connectedWallets);

  return (
    <div className="accounts">
      {connectedCexes.map((connectedCex) => {
        return (
          <div key={connectedCex.name} className="accounts__account">
            <div className="accounts__account__info">
              <div className="accounts__account__info__title">{connectedCex.name}</div>
              <div className="accounts__account__info__address">Net Worth: {utils.toUsd(connectedCex.netWorth)}</div>
            </div>
            <div className="accounts__account__buttons">
              <button className="accounts__account__buttons__button">Delete</button>
            </div>
          </div>
        );
      })}
      {connectedWallets.map((connectedWallet) => {
        return (
          <div key={connectedWallet.address} className="accounts__account">
            <div className="accounts__account__info">
              <div className="accounts__account__info__title">{connectedWallet.chain}</div>
              <div className="accounts__account__info__address">Name: {connectedWallet.name}</div>
              <div className="accounts__account__info__address">
                Address:{" "}
                <a
                  href={connectedWallet.scan}
                  target="_blank"
                  rel="noreferrer"
                  className="accounts__account__info__address"
                >
                  {connectedWallet.address}
                </a>
              </div>
              <div className="accounts__account__info__address">Net Worth: {utils.toUsd(connectedWallet.netWorth)}</div>
            </div>

            <div className="accounts__account__buttons">
              <button className="accounts__account__buttons__button">Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accounts;
