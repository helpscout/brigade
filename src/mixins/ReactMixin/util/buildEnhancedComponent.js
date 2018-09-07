import { EnhancedComponent } from "../../../components";
import React from "react";

const buildEnhancedComponent = (component, state, selector) => {
  const props = { component, state, selector };
  return <EnhancedComponent {...props} />;
};

export default buildEnhancedComponent;
