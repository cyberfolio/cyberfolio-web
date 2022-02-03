import React from "react";
import "./ChainsDropDown.scss";

import { ACTIONS } from "../../../state/actions";
import { useDispatch } from "react-redux";

import { chainsInfo } from '../../../utils'

export const ChainsDropDown = () => {
  const dispatch = useDispatch();


  const setChain = (chain, image) => {
    dispatch({
      type: ACTIONS.FILTER_ASSETS_BY_CHAIN,
      payload: {
        data: {
          name: chain,
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

ChainsDropDown.whyDidYouRender = true

