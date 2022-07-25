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
              <div className="accounts__account__info__title">{connectedCex.name} Account</div>
              <div className="accounts__account__info__item">
                Net Worth: <strong>{utils.toUsd(connectedCex.netWorth)}</strong>
              </div>
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
              <div className="accounts__account__info__title">{connectedWallet.chain} Wallet</div>
              <div className="accounts__account__info__item">
                Name: <strong>{connectedWallet.name}</strong>
              </div>
              <div className="accounts__account__info__item">
                Address: <strong>{connectedWallet.address}</strong>
              </div>
              <div className="accounts__account__info__item">
                Net Worth: <strong>{utils.toUsd(connectedWallet.netWorth)}</strong>
              </div>
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
