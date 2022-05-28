import React from "react";
import "./index.scss";

import { useSelector } from "react-redux";

const Index = () => {
  const loading = useSelector((state) => state.loading);

  if (loading) {
    return (
      <div className="loading">
        <i className="fa-5x fa-solid fa-arrows-rotate fa-spin"></i>
      </div>
    );
  }
  return <></>;
};

export default Index;
