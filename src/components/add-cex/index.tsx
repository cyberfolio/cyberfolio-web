import { useRef, useState } from "react";
import "./index.scss";

import classnames from "classnames";
import { toast } from "react-hot-toast";

import CexService from "@services/cex";
import useKeypress from "@hooks/useKeyPress";
import { useAppDispatch, useAppSelector } from "@store/functions";
import utils from "@utils/index";
import { Cex, Keys } from "@app-types/index";
import InfoService from "@services/info";

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
    utils.setAppLoading(true);
    if (!apiKey || !apiSecret) {
      toast.error("Please enter api key and secret.");
      setLoading(false);
      utils.setAppLoading(false);
      return;
    }
    if (name === Cex.KUCOIN && !passphrase) {
      toast.error("Please enter passphrase.");
      setLoading(false);
      utils.setAppLoading(false);
      return;
    }
    try {
      if (name) {
        await CexService.addCex({
          apiKey,
          apiSecret,
          cexName: name,
          passphrase,
        });
        const cexAssets = await CexService.getCexTokens();
        const netWorth = await InfoService.getNetWorth();
        const availableAccounts = await InfoService.getConnectedAccounts();
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
      utils.setAppLoading(false);
      setLoading(false);
    }
  };

  useKeypress(Keys.Escape, () => {
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
        <a className="add-cex-modal__content__link" href={utils.cexAPIKeyURL[name]} target="_blank" rel="noreferrer">
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
