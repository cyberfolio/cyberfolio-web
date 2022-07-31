import { useRef, useState } from "react";
import "./index.scss";

import { toast } from "react-hot-toast";
import classnames from "classnames";

import DexService from "@services/dex";
import useKeypress from "@components/hooks/useKeyPress";
import utils from "@utils/index";
import { useAppDispatch, useAppSelector } from "@store/functions";
import { Chain, Keys } from "@customTypes/index";
import InfoService from "@services/info";

const AddWallet = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const { chain, open } = useAppSelector((state) => state.isWalletModalOpen);

  const dispatch = useAppDispatch();
  const modalRef = useRef(null);

  const add = async () => {
    try {
      const isValid = await utils.isValidWalletAddress({ address, chain });
      if (!isValid) {
        toast.error(`${chain} address is not valid`);
        return;
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Unexpected error");
      }
    }
    try {
      setLoading(true);
      utils.setAppLoading(true);
      await DexService.addWallet({ name, address, chain });
      const allDexTokens = await DexService.getAllDexTokens();
      dispatch({
        type: "SET_DEX_ASSETS",
        payload: allDexTokens.assets,
      });
      const availableAccounts = await InfoService.getConnectedAccounts();
      toast.success("Wallet added.");
      dispatch({
        type: "SET_CONNECTED_WALLETS",
        payload: availableAccounts.wallets,
      });
      const netWorth = await InfoService.getNetWorth();
      dispatch({
        type: "SET_NET_WORTH",
        payload: netWorth,
      });
      setName("");
      setAddress("");
      close();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
      utils.setAppLoading(false);
    }
  };
  useKeypress(Keys.Escape, () => {
    close();
    setName("");
    setAddress("");
  });

  const close = () => {
    dispatch({
      type: "OPEN_WALLET_MODAL",
      payload: {
        open: false,
        chain: Chain.BITCOIN,
      },
    });
  };

  return (
    <div className={classnames("add-wallet-modal", open && "add-wallet-modal--active")}>
      <div className="add-wallet-modal__content" ref={modalRef}>
        <div className="add-wallet-modal__content__header">
          <div />
          <div className="add-wallet-modal__content__header__title">Add {chain} Wallet</div>
          <div className="add-wallet-modal__content__header__exit" onClick={close}>
            X
          </div>
        </div>
        <div className="add-wallet-modal__content__body">
          <input
            className="add-wallet-modal__content__body__input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Wallet Address"
            maxLength={100}
          />
          <input
            className="add-wallet-modal__content__body__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Wallet Name"
            maxLength={20}
          />
          <div className="add-wallet-modal__content__body__button">
            <button
              className={classnames(
                "add-wallet-modal__content__body__button__content",
                open && "add-wallet-modal__content__body__button__content--loading",
              )}
              onClick={add}
              disabled={loading}
            >
              {loading && (
                <div className="fa-1x" style={{ marginRight: 8 }}>
                  <i className="fas fa-sync fa-spin"></i>
                </div>
              )}
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWallet;
