import React from "react";

if (process.env.NODE_ENV === "staging") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    trackExtraHooks: [[require("react-redux/lib"), "useSelector"]],
  });
}
