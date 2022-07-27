import Modal from "@components/modal";
import { Chain, Cex } from "@customTypes/index";
import CexService from "@services/cex";
import DexService from "@services/dex";
import InfoService from "@services/info";
import { useAppDispatch, useAppSelector } from "@store/functions";
import utils from "@utils/index";
import { useState } from "react";
import toast from "react-hot-toast";
import "./index.scss";

const Accounts = () => {
  const connectedCexes = useAppSelector((state) => state.connectedCexes);
  const connectedWallets = useAppSelector((state) => state.connectedWallets);
  const [whatToDelete, setWhatToDelete] = useState("");
  const [cexToDelete, setCexToDelete] = useState<Cex | undefined>();
  const [walletToDelete, setWalletToDelete] = useState<Chain | undefined>();
  const [walletAddressToDelete, setWalletAddressToDelete] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const resetAccounts = async () => {
    const availableAccounts = await InfoService.getConnectedAccounts();
    const cexAssets = await CexService.getCexTokens();
    const dexAssets = await DexService.getAllDexTokens();
    const netWorth = await InfoService.getNetWorth();
    dispatch({
      type: "SET_CONNECTED_CEXES",
      payload: {
        data: availableAccounts.cexes,
      },
    });
    dispatch({
      type: "SET_CONNECTED_WALLETS",
      payload: {
        data: availableAccounts.wallets,
      },
    });
    dispatch({
      type: "SET_CEX_ASSETS",
      payload: {
        data: cexAssets,
      },
    });
    dispatch({
      type: "SET_DEX_ASSETS",
      payload: {
        data: dexAssets.assets,
      },
    });
    dispatch({
      type: "SET_NET_WORTH",
      payload: {
        data: netWorth,
      },
    });
  };

  const onClickCexOkey = async () => {
    if (!cexToDelete) return;
    try {
      setLoading(true);
      await CexService.deleteCex({ cexName: cexToDelete });
      toast.success(`${cexToDelete} Account deleted`);
      closeDeleteModal();
      await resetAccounts();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onClickWalletOkey = async () => {
    if (!walletToDelete) return;
    try {
      setLoading(true);
      await DexService.deleteWallet({ chain: walletToDelete, address: walletAddressToDelete });
      toast.success(`${walletToDelete} Wallet deleted`);
      closeDeleteModal();
      await resetAccounts();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const closeDeleteModal = () => {
    setWhatToDelete("");
    setCexToDelete(Cex.NO);
    setWalletToDelete(Chain.NO);
  };

  const onDeleteCexClick = async (name: Cex) => {
    setCexToDelete(name);
    setWhatToDelete(`Are you sure you want to delete ${name} Account`);
  };
  const onDeleteWalletClick = (name: Chain, walletAddress: string) => {
    setWalletToDelete(name);
    setWalletAddressToDelete(walletAddress);
    setWhatToDelete(`Are you sure you want to delete ${name} Wallet`);
  };

  return (
    <div className="accounts">
      <Modal
        open={Boolean(whatToDelete)}
        title={whatToDelete}
        action={cexToDelete ? onClickCexOkey : onClickWalletOkey}
        close={closeDeleteModal}
        loading={loading}
      />
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
              <button
                className="accounts__account__buttons__button"
                onClick={() => onDeleteCexClick(connectedCex.name)}
              >
                Delete
              </button>
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
              <button
                className="accounts__account__buttons__button"
                onClick={() => onDeleteWalletClick(connectedWallet.chain, connectedWallet.address)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accounts;
