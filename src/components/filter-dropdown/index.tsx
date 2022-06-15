import "./index.scss";

import { platformInfo } from "@utils/index";
import { useAppDispatch } from "@store/functions";

const ChainsDropDown = () => {
  const dispatch = useAppDispatch();

  const setChain = (platform: string, image: string) => {
    dispatch({
      type: "FILTER_ASSETS_BY_PLATFORM",
      payload: {
        name: platform.toLowerCase(),
        image,
      },
    });
  };

  return (
    <div className="chains-dropdown">
      {platformInfo.map(({ name, image }) => {
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
