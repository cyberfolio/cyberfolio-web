import React, { useRef, useState } from "react";
import "./AddCexModal.scss";

import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

import { ACTIONS } from "../../state/actions";
import useKeypress from "../hooks/useKeyPress";
import useIsClickedOutside from "../hooks/useIsClickedOutside";
import { toast } from "react-toastify";
import { addCex } from "../../services/cex";

export const AddCexModal = () => {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [loading, setLoading] = useState("");
  const { name, open } = useSelector((state) => state.isAddCexModalOpen);
  const dispatch = useDispatch();
  const modalRef = useRef();

  const add = async () => {
    setLoading(true);
    if (!apiKey || !apiSecret) {
      toast.error("Please enter api key and secret.");
      setLoading(false);
      return;
    }
    try {
      const cexName = name.split(' ').shift()
      const cexAssets = await addCex({ apiKey, apiSecret, cexName });
      dispatch({
        type: ACTIONS.SET_CEX_ASSETS,
        payload: {
          cexAssets
        },
      });      
      toast.success(`${name} added`);
      setLoading(false);
      close();
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
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
      type: ACTIONS.OPEN_ADD_CEX_MODAL,
      payload: {
        open: false,
        name: "",
      },
    });
  };

  return (
    <div
      className={classnames("add-cex-modal", open && "add-cex-modal--active")}
    >
      <div className="add-cex-modal__content" ref={modalRef}>
        <div className="add-cex-modal__content__header">
          <div />
          <div className="add-cex-modal__content__header__title">
            Add {name}
          </div>
          <div className="add-cex-modal__content__header__exit" onClick={close}>
            X
          </div>
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
          <div
            className="add-cex-modal__content__body__button__wrapper"
            onClick={add}
          >
            <div className="add-cex-modal__content__body__button__wrapper__button">
              {loading && (
                <div className="fa-1x add-cex-modal__content__body__button__wrapper__button__loading">
                  <i className="fas fa-sync fa-spin"></i>
                </div>
              )}{"  "}
              Add
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
