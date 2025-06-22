import { useRef } from "react";
import "./index.scss";

import AppHooks from "hooks/index";
import AppStructures from "structures/index";

const Index = () => {
  const dispatch = AppHooks.useAppDispatch();
  const modalRef = useRef(null);

  AppHooks.useKeypress(AppStructures.Keys.Escape, () => {
    close();
  });

  const close = () => {
    dispatch({
      type: "OPEN_ADD_CEX_MODAL",
      payload: {
        open: false,
        name: AppStructures.Cex.NO,
      },
    });
  };

  return (
    <div className={"addbundle"}>
      <div className="addbundle__content" ref={modalRef}></div>
    </div>
  );
};

export default Index;
