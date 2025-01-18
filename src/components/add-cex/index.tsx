import { useRef, useState } from "react";
import "./index.scss";

import classnames from "classnames";
import { toast } from "react-hot-toast";

import AppHooks from "hooks";
import AppServices from "services";
import AppUtils from "utils";

import { useAppDispatch, useAppSelector } from "store/functions";
import { Cex, Keys } from "structures";

const AddCex = () => {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [loading, setLoading] = useState(false);
  const { name, open } = useAppSelector((state) => state.isAddCexModalOpen);
  const dispatch = useAppDispatch();
  const modalRef = useRef(null);

  const add = async () => {
    if (loading) return;
    setLoading(true);
    AppUtils.setAppLoading(true, "Patience is a virtue...");
    if (!apiKey || !apiSecret) {
      toast.error("Please enter api key and secret.");
      setLoading(false);
      AppUtils.setAppLoading(false);
      return;
    }
    if (name === Cex.KUCOIN && !passphrase) {
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

  AppHooks.useKeypress(Keys.Escape, () => {
    setApiKey("");
    setApiSecret("");
    setPassphrase("");
    close();
  });

  const close = () => {
    dispatch({
      type: "OPEN_ADD_CEX_MODAL",
      payload: {
        open: false,
        name: Cex.NO,
      },
    });
  };

  return (
    <div className={classnames("add-cex-modal", open && "add-cex-modal--active")}>
      <div className="add-cex-modal__content" ref={modalRef}>
        <div className="add-cex-modal__content__header">
          <div />
          <div className="add-cex-modal__content__header__title">Add {name}</div>
          <div className="add-cex-modal__content__header__exit" onClick={close}>
            X
          </div>
        </div>
        <a className="add-cex-modal__content__link" href={AppUtils.cexAPIKeyURL[name]} target="_blank" rel="noreferrer">
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
          {name === Cex.KUCOIN && (
            <input
              className="add-cex-modal__content__body__input"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Enter Passphrase"
            />
          )}
          <div className="add-cex-modal__content__body__button__wrapper" onClick={add}>
            <button
              className="add-cex-modal__content__body__button__wrapper__button"
              onClick={add}
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
    </div>
  );
};

export default AddCex;
