import React from "react";
import "./index.scss";

import classnames from "classnames";
import { toast } from "react-hot-toast";

import AppHooks from "hooks/index";
import AppServices from "services/index";
import AppUtils from "utils/index";
import AppStructures from "structures/index";
import AppComponents from "components/index";

type AddCexModalProps = {
  name: AppStructures.Cex;
  isOpen: boolean;
  onClose: () => void;
};

const AddCexModal = ({ name, isOpen, onClose }: AddCexModalProps) => {
  const [apiKey, setApiKey] = React.useState("");
  const [apiSecret, setApiSecret] = React.useState("");
  const [passphrase, setPassphrase] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = AppHooks.useAppDispatch();

  const handleAddCexAccount = async () => {
    if (loading) return;
    setLoading(true);
    AppUtils.setAppLoading(true, "Patience is a virtue...");
    if (!apiKey || !apiSecret) {
      toast.error("Please enter api key and secret.");
      setLoading(false);
      AppUtils.setAppLoading(false);
      return;
    }
    if (name === AppStructures.Cex.KUCOIN && !passphrase) {
      toast.error("Please enter passphrase.");
      setLoading(false);
      AppUtils.setAppLoading(false);
      return;
    }
    try {
      if (name) {
        await AppServices.CEX.addCex({
          apiKey,
          apiSecret,
          cexName: name,
          passphrase,
        });
        const cexAssets = await AppServices.CEX.getCexTokens();
        const netWorth = await AppServices.INFO.getNetWorth();
        const availableAccounts = await AppServices.INFO.getConnectedAccounts();
        dispatch({
          type: "SET_CONNECTED_CEXES",
          payload: availableAccounts.cexes,
        });
        dispatch({
          type: "SET_CEX_ASSETS",
          payload: cexAssets,
        });
        dispatch({
          type: "SET_NET_WORTH",
          payload: netWorth,
        });
        toast.success(`${name} added`);
      }
      close();
    } catch (e) {
      toast.error(e.message);
    } finally {
      AppUtils.setAppLoading(false);
      setLoading(false);
    }
  };

  AppHooks.useKeypress(AppStructures.Keys.Escape, () => {
    setApiKey("");
    setApiSecret("");
    setPassphrase("");
    close();
  });

  return (
    <AppComponents.Modal
      title={`Add ${name} Account`}
      open={isOpen}
      close={onClose}
      content={
        <div className="add-cex-modal__content">
          {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
          {/* @ts-ignore */}
          <a
            href={AppUtils.cexAPIKeyURL[name]}
            className="add-cex-modal__content__link"
            target="_blank"
            rel="noreferrer"
          >
            Click here to navigate API Creation Link
          </a>
          <div className="add-cex-modal__content__info">
            Please only enable <b>READING ONLY</b> option!
          </div>
          <div className="add-cex-modal__content__body">
            <input
              className="add-cex-modal__content__body__input"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter Api Key"
            />
            <input
              className="add-cex-modal__content__body__input"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              placeholder="Enter Api Secret"
            />
            {name === AppStructures.Cex.KUCOIN && (
              <input
                className="add-cex-modal__content__body__input"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Enter Passphrase"
              />
            )}
            <div className="add-cex-modal__content__body__button__wrapper">
              <button
                className="add-cex-modal__content__body__button__wrapper__button"
                onClick={handleAddCexAccount}
                disabled={!apiKey || !apiSecret}
              >
                <i
                  className={classnames(
                    "fas fa-sync fa-spin",
                    loading
                      ? "add-cex-modal__content__body__button__wrapper__button--loading"
                      : "add-cex-modal__content__body__button__wrapper__button--not-loading",
                  )}
                  style={{ marginRight: 5 }}
                ></i>
                Add
              </button>
            </div>
          </div>
        </div>
      }
      loading={loading}
    />
  );

  // return (
  //   <div className={classnames("add-cex-modal", open && "add-cex-modal--active")}>
  //     <div className="add-cex-modal__content" ref={modalRef}>
  //       <div className="add-cex-modal__content__header">
  //         <div />
  //         <div className="add-cex-modal__content__header__title">Add {name}</div>
  //         <div className="add-cex-modal__content__header__exit" onClick={close}>
  //           X
  //         </div>
  //       </div>
  //       {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
  //       {/* @ts-ignore */}
  //       <a className="add-cex-modal__content__link" href={AppUtils.cexAPIKeyURL[name]} target="_blank" rel="noreferrer">
  //         Click here to navigate API Creation Link
  //       </a>
  //       <div className="add-cex-modal__content__info">
  //         Please only enable <b>READING ONLY</b> option!
  //       </div>
  //       <div className="add-cex-modal__content__body">
  //         <input
  //           className="add-cex-modal__content__body__input"
  //           value={apiKey}
  //           onChange={(e) => setApiKey(e.target.value)}
  //           placeholder="Enter Api Key"
  //         />
  //         <input
  //           className="add-cex-modal__content__body__input"
  //           value={apiSecret}
  //           onChange={(e) => setApiSecret(e.target.value)}
  //           placeholder="Enter Api Secret"
  //         />
  //         {name === AppStructures.Cex.KUCOIN && (
  //           <input
  //             className="add-cex-modal__content__body__input"
  //             value={passphrase}
  //             onChange={(e) => setPassphrase(e.target.value)}
  //             placeholder="Enter Passphrase"
  //           />
  //         )}
  //         <div className="add-cex-modal__content__body__button__wrapper" onClick={add}>
  //           <button
  //             className="add-cex-modal__content__body__button__wrapper__button"
  //             onClick={add}
  //             disabled={!apiKey || !apiSecret}
  //           >
  //             <i
  //               className={classnames(
  //                 "fas fa-sync fa-spin",
  //                 loading
  //                   ? "add-cex-modal__content__body__button__wrapper__button--loading"
  //                   : "add-cex-modal__content__body__button__wrapper__button--not-loading",
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

export default AddCexModal;
