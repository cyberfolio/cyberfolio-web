import React, { useRef, useState } from "react";
import "./AddWalletModal.scss";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import classnames from "classnames";

import { addWallet } from "../../services/WalletService";
import { ACTIONS } from "../../state/actions";
import useKeypress from "../../utils/useKeyPress";
import useIsClickedOutside from "../../utils/useIsClickedOutside";

export const AddWalletModal = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const isWalletModalOpen = useSelector((state) => state.isWalletModalOpen);
  const dispatch = useDispatch();
  const modalRef = useRef();

  const add = async () => {
    try {
      await addWallet({ name, address });
      dispatch({
        type: ACTIONS.OPEN_WALLET_MODAL,
        payload: {
          open: false,
          chain: "",
        },
      });
      setName("");
      setAddress("");
    } catch (e) {
      toast.error(e.message);
    }
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
        "add-wallet-modal",
        isWalletModalOpen?.open && "add-wallet-modal--active"
      )}
    >
      <div className="add-wallet-modal__content" ref={modalRef}>
        <div className="add-wallet-modal__content__header">
          <div />
          <div className="add-wallet-modal__content__header__title">
            Add {isWalletModalOpen?.chain}
          </div>
          <div
            className="add-wallet-modal__content__header__exit"
            onClick={close}
          >
            X
          </div>
        </div>
        <div className="add-wallet-modal__content__body">
          <input
            className="add-wallet-modal__content__body__input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Wallet Address"
            maxLength="42"
          />
          <input
            className="add-wallet-modal__content__body__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Wallet Name"
            maxLength="20"
          />
          <div
            className="add-wallet-modal__content__body__button"
            onClick={add}
          >
            Add
          </div>
        </div>
      </div>
    </div>
  );
};
