import { useRef, useState } from "react";
import "./index.scss";

import { toast } from "react-hot-toast";
import classnames from "classnames";

import DexService from "@services/dex";
import useKeypress from "@components/hooks/useKeyPress";
import { isValidWalletAddress, setAppLoading } from "@utils/index";
import { useAppDispatch, useAppSelector } from "@store/functions";

const AddWallet = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const { chain, open } = useAppSelector((state) => state.isWalletModalOpen);

  const dispatch = useAppDispatch();
  const modalRef = useRef(null);

  const add = async () => {
    const isValid = await isValidWalletAddress({ address, chain });
    if (!isValid) {
      toast.error(`${chain} address is not valid`);
      return;
    }
    try {
      setLoading(true);
      setAppLoading(true);
      await DexService.addWallet({ name, address, chain });
      toast.success("Wallet added.");
    } catch (e) {
      toast.error(e.message);
    } finally {
      close();
      setName("");
      setAddress("");
      setLoading(false);
      setAppLoading(false);
    }
  };
  useKeypress("Escape", () => {
    close();
  });

  const close = () => {
    dispatch({
      type: "OPEN_WALLET_MODAL",
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
        open && "add-wallet-modal--active"
      )}
    >
      <div className="add-wallet-modal__content" ref={modalRef}>
        <div className="add-wallet-modal__content__header">
          <div />
          <div className="add-wallet-modal__content__header__title">
            Add {chain} Wallet
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
            maxLength={42}
          />
          <input
            className="add-wallet-modal__content__body__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Wallet Name"
            maxLength={20}
          />
          <button
            className="add-wallet-modal__content__body__button"
            onClick={add}
            disabled={loading}
          >
            {loading && (
              <div className="fa-1x" style={{ marginRight: 5 }}>
                <i className="fas fa-sync fa-spin"></i>
              </div>
            )}
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWallet;
