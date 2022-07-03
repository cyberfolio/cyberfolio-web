import { useRef } from "react";
import "./index.scss";

import useKeypress from "@components/hooks/useKeyPress";
import { useAppDispatch } from "@store/functions";
import { Cex } from "@customTypes/index";

const Index = () => {
  const dispatch = useAppDispatch();
  const modalRef = useRef(null);

  useKeypress("Escape", () => {
    close();
  });

  const close = () => {
    dispatch({
      type: "OPEN_ADD_CEX_MODAL",
      payload: {
        open: false,
        name: Cex.NO,
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
