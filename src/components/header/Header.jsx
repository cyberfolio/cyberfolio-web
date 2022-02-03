import React from "react";
import "./Header.scss";
import { toast } from 'react-toastify';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";

import Metamask from "../../assets/metamask.png";
import { ACTIONS } from "../../state/actions";
import { truncateEthAddress } from '../../utils'
let web3 = new Web3()


export const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-brand">Cyberfolio</div>
          <ConnectWallet />
      </div>
    </div>
  );
};

const ConnectWallet = () => {
  const [disabled, setDisabled] = React.useState("");

  const dispatch = useDispatch();
  const evmAddress = useSelector((state) => state.evmAddress);

  const onClickConnect = async () => {
    try {
      setDisabled(true);
      const metamask = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      
      setDisabled(false);
      dispatch({
        type: ACTIONS.SET_EVM_ADDRESS,
        payload: {
          data: metamask[0]
        },
      });
    } catch (error) {
      toast.error(error.message)
      setDisabled(false);
    }
  };

  const renderTooltip = (props) => {
    if (evmAddress)
      return (
        <Tooltip id="button-tooltip" {...props}>
          <div className="metamask-tooltip"> {truncateEthAddress(evmAddress)}</div>
        </Tooltip>
      );
    return (
      <Tooltip id="button-tooltip" {...props}>
        This will be your key identifier
      </Tooltip>
    );
  };

  return (
    <div className="metamask">
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 50, hide: 100 }}
        overlay={renderTooltip}
      >
        <div className={`metamask-button ${disabled ? "disabledbutton" : ""}`}>
          <img className="metamask-button-img" src={Metamask} alt="metamask" />
          {evmAddress ? <span className="connectedDot"></span> : <></>}
          <div className="metamask-button-text" onClick={onClickConnect}>
            {evmAddress ? "" : "Connect Metamask"}
          </div>
        </div>
      </OverlayTrigger>
    </div>
  );
};
