import React, { useRef, useState } from "react";
import "./AddCexModal.scss";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import classnames from "classnames";

import { ACTIONS } from "../../state/actions";
import useKeypress from "../../utils/useKeyPress";
import useIsClickedOutside from "../../utils/useIsClickedOutside";

export const AddCexModal = ( { name }) => {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const { chain, open } = useSelector((state) => state.isWalletModalOpen);
  const dispatch = useDispatch();
  const modalRef = useRef();

  const add = async () => {
  
    
  };

  useKeypress("Escape", () => {
    close();
  });
  useIsClickedOutside(modalRef, () => {
    close();
  });

  const close = () => {
    dispatch({
      type: ACTIONS.OPEN_WALLET_MODAL,
      payload: {
        open: false,
        chain: "",
      },
    });
  };

  return (
    <div
      className={classnames(
        "add-cex-modal",
        open && "add-dex-modal--active"
      )}
    >
      <div className="add-dex-modal__content" ref={modalRef}>
        <div className="add-cex-modal__content__header">
          <div />
          <div className="add-cex-modal__content__header__title">
            Add {chain} Wallet
          </div>
          <div
            className="add-cex-modal__content__header__exit"
            onClick={close}
          >
            X
          </div>
        </div>
        <div className="add-cex-modal__content__body">
          <input
            className="add-cex-modal__content__body__input"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter Wallet Address"
            maxLength="42"
          />
          <input
            className="add-cex-modal__content__body__input"
            value={apiSecret}
            onChange={(e) => setApiSecret(e.target.value)}
            placeholder="Enter Wallet Name"
            maxLength="42"
          />
          <div
            className="add-cex-modal__content__body__button"
            onClick={add}
          >
            Add
          </div>
        </div>
      </div>
    </div>
  );
};
