import "./index.scss";

import utils from "@utils/index";
import { useAppDispatch } from "@store/functions";
import { AllNetworks, Cex, Chain } from "@customTypes/index";
import ALLNetworks from "@assets/blockchain.svg";

const PlatformFilter = () => {
  const dispatch = useAppDispatch();

  const setPlatform = (platform: Cex | Chain | AllNetworks, image: string) => {
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
      <div className="chains-dropdown__item" onClick={() => setPlatform(AllNetworks.ALLNETWORKS, ALLNetworks)}>
        <img className="chains-dropdown__item__image" src={ALLNetworks} alt={AllNetworks.ALLNETWORKS} height={25} />
        <div className="chains-dropdown__item__name"> {AllNetworks.ALLNETWORKS} </div>
      </div>
      {utils.chainInfo.map(({ name, image }) => {
        return (
          <div key={name} className="chains-dropdown__item" onClick={() => setPlatform(name, image)}>
            <img className="chains-dropdown__item__image" src={image} alt={name} height={25} />
            <div className="chains-dropdown__item__name"> {name} </div>
          </div>
        );
      })}
      {utils.cexInfo.map(({ name, image }) => {
        return (
          <div key={name} className="chains-dropdown__item" onClick={() => setPlatform(name, image)}>
            <img className="chains-dropdown__item__image" src={image} alt={name} height={25} />
            <div className="chains-dropdown__item__name"> {name} </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlatformFilter;
