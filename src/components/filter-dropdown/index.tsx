import "./index.scss";

import utils from "@utils/index";
import { useAppDispatch } from "@store/functions";
import { Platform } from "@customTypes/index";

const ChainsDropDown = () => {
  const dispatch = useAppDispatch();

  const setChain = (platform: Platform, image: string) => {
    dispatch({
      type: "FILTER_ASSETS_BY_PLATFORM",
      payload: {
        platform,
        image,
      },
    });
  };

  return (
    <div className="chains-dropdown">
      {utils.platformInfo.map(({ name, image }) => {
        return (
          <div key={name} className="chains-dropdown__item" onClick={() => setChain(name, image)}>
            <img className="chains-dropdown__item__image" src={image} alt={name} height={25} />
            <div className="chains-dropdown__item__name"> {name} </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChainsDropDown;
