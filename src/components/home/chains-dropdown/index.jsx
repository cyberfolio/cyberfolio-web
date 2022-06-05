import React from "react";
import "./index.scss";

import Actions from "../../../store/actions";
import { useDispatch } from "react-redux";

import { chainsInfo } from "../../../utils";

const ChainsDropDown = () => {
  const dispatch = useDispatch();

  const setChain = (chain, image) => {
    dispatch({
      type: Actions.FILTER_ASSETS_BY_CHAIN,
      payload: {
        data: {
          name: chain.toLowerCase(),
          image,
        },
      },
    });
  };

  return (
    <div className="chains-dropdown">
      {chainsInfo.map(({ name, image }) => {
        return (
          <div
            key={name}
            className="chains-dropdown__item"
            onClick={() => setChain(name, image)}
          >
            <img
              className="chains-dropdown__item__image"
              src={image}
              alt={name}
              height={25}
            />
            <div className="chains-dropdown__item__name"> {name} </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChainsDropDown;
