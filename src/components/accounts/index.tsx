import { useAppSelector } from "@store/functions";
import "./index.scss";

const Accounts = () => {
  const connectedCexes = useAppSelector((state) => state.connectedCexes);
  const connectedWallets = useAppSelector((state) => state.connectedWallets);

  return (
    <div className="accounts">
      {connectedCexes.map((connectedCex) => {
        return (
          <div key={connectedCex} className="accounts__account">
            {connectedCex}
          </div>
        );
      })}
      {connectedWallets.map((connectedWallet) => {
        return (
          <div key={connectedWallet.walletAddress} className="accounts__account">
            {connectedWallet.chain}
          </div>
        );
      })}
    </div>
  );
};

export default Accounts;
