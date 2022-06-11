import "./index.scss";

import { chainsInfo } from "../../../utils";
import { useAppDispatch } from "../../../hooks";

const ChainsDropDown = () => {
  const dispatch = useAppDispatch();

  const setChain = (platform: string, image: string) => {
    dispatch({
      type: "FILTER_ASSETS_BY_PLATFORM",
      payload: {
        data: {
          name: platform.toLowerCase(),
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
