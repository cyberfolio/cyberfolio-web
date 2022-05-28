import React, { useRef, useState } from "react";
import "./index.scss";

import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import toast from "react-hot-toast";

import CexService from "../../services/cex";
import { ACTIONS } from "../../store/actions";
import useKeypress from "../../hooks/useKeyPress";


 const AddCex = () => {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [loading, setLoading] = useState("");
  const { name, open } = useSelector((state) => state.isAddCexModalOpen);
  const dispatch = useDispatch();
  const modalRef = useRef();

  const add = async () => {
    setLoading(true);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: {
        data: true
      },
    });
    if (!apiKey || !apiSecret) {
      toast.error("Please enter api key and secret.");
      setLoading(false);
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: {
          data: false
        },
      });
      return;
    }
    if (name.split(" ").shift().toLowerCase() === "kucoin" && !passphrase) {
      toast.error("Please enter passphrase.");
      setLoading(false);
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: {
          data: false
        },
      });
      return;
    }
    try {
      const cexName = name.split(" ").shift();
      const cexAssets = await CexService.addCex({
        apiKey,
        apiSecret,
        cexName,
        passphrase,
      });
      dispatch({
        type: ACTIONS.SET_CEX_ASSETS,
        payload: {
          cexAssets,
        },
      });
      toast.success(`${name} added`);
      setLoading(false);
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: {
          data: false
        },
      });
      close();
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: {
          data: false
        },
      });
    }
  };

  useKeypress("Escape", () => {
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
          {name.split(" ").shift().toLowerCase() === "kucoin" && (
            <input
              className="add-cex-modal__content__body__input"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Enter Passphrase"
            />
          )}
          <div
            className="add-cex-modal__content__body__button__wrapper"
            onClick={add}
          >
            <button
              className="add-cex-modal__content__body__button__wrapper__button"
              disabled={loading}
            >
              {loading && (
                <div
                  className="fa-1x add-cex-modal__content__body__button__wrapper__button__loading"
                  style={{ marginRight: 5 }}
                >
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

export default AddCex
