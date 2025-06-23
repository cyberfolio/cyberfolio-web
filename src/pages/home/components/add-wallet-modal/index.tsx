import { useRef, useState } from "react";
import "./index.scss";

import { toast } from "react-hot-toast";
import classnames from "classnames";

import DexService from "services/dex";
import AppHooks from "hooks/index";
import AppUtils from "utils/index";
import AppStructures from "structures/index";
import InfoService from "services/info";
import AppComponents from "components/index";

type AddWalletModalprops = {
  chain: AppStructures.Chain;
  isOpen: boolean;
  onClose: () => void;
};

const AddWalletModal = ({ chain, isOpen, onClose }: AddWalletModalprops) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = AppHooks.useAppDispatch();

  const add = async () => {
    try {
      const isValid = await AppUtils.isValidWalletAddress({ address, chain });
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
      AppUtils.setAppLoading(true);
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
      AppUtils.setAppLoading(false);
    }
  };
  AppHooks.useKeypress(AppStructures.Keys.Escape, () => {
    close();
    setName("");
    setAddress("");
    setLoading(false);
  });

  const close = () => {
    onClose();
    setName("");
    setAddress("");
    setLoading(false);
  };

  return (
    <AppComponents.Modal
      title={`Add ${chain} Wallet`}
      open={isOpen}
      close={close}
      loading={loading}
      content={
        <div className="add-wallet-modal__content__body">
          <div className="add-wallet-modal__content__body__container">
            <label className="add-wallet-modal__content__body__container__label">Address</label>
            <input
              className="add-wallet-modal__content__body__container__input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Wallet Address"
              maxLength={100}
            />
          </div>

          <div className="add-wallet-modal__content__body__container">
            <label className="add-wallet-modal__content__body__container__label">Name</label>
            <input
              className="add-wallet-modal__content__body__container__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Wallet Name"
              maxLength={20}
            />
          </div>
          <div className="add-wallet-modal__content__body__button">
            <button
              className={classnames("add-wallet-modal__content__body__button__content")}
              onClick={add}
              disabled={loading || !name || !address}
            >
              <i
                className={classnames(
                  "fa-1x fas fa-sync fa-spin",
                  loading
                    ? "add-wallet-modal__content__body__button__content--loading"
                    : "add-wallet-modal__content__body__button__content--not-loading",
                )}
                style={{ marginRight: 5 }}
              ></i>
              Add
            </button>
          </div>
        </div>
      }
    />
  );

  // return (
  //   <div className={classnames("add-wallet-modal", isOpen && "add-wallet-modal--active")}>
  //     <div className="add-wallet-modal__content" ref={modalRef}>
  //       <div className="add-wallet-modal__content__header">
  //         <div />
  //         <div className="add-wallet-modal__content__header__title">Add {chain} Wallet</div>
  //         <div className="add-wallet-modal__content__header__exit" onClick={close}>
  //           X
  //         </div>
  //       </div>
  //       <div className="add-wallet-modal__content__body">
  //         <div className="add-wallet-modal__content__body__container">
  //           <label className="add-wallet-modal__content__body__container__label">Address</label>
  //           <input
  //             className="add-wallet-modal__content__body__container__input"
  //             value={address}
  //             onChange={(e) => setAddress(e.target.value)}
  //             placeholder="Enter Wallet Address"
  //             maxLength={100}
  //           />
  //         </div>

  //         <div className="add-wallet-modal__content__body__container">
  //           <label className="add-wallet-modal__content__body__container__label">Name</label>
  //           <input
  //             className="add-wallet-modal__content__body__container__input"
  //             value={name}
  //             onChange={(e) => setName(e.target.value)}
  //             placeholder="Enter Wallet Name"
  //             maxLength={20}
  //           />
  //         </div>
  //         <div className="add-wallet-modal__content__body__button">
  //           <button
  //             className={classnames("add-wallet-modal__content__body__button__content")}
  //             onClick={add}
  //             disabled={loading || !name || !address}
  //           >
  //             <i
  //               className={classnames(
  //                 "fa-1x fas fa-sync fa-spin",
  //                 loading
  //                   ? "add-wallet-modal__content__body__button__content--loading"
  //                   : "add-wallet-modal__content__body__button__content--not-loading",
  //               )}
  //               style={{ marginRight: 5 }}
  //             ></i>
  //             Add
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default AddWalletModal;
