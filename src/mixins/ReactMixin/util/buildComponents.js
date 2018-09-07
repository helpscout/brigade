import { render as defaultRender } from "react-dom";
import { buildEnhancedComponent, getBuilder, getEl } from "./util";

const buildComponents = (view, components, render = defaultRender) => {
  return Object.keys(components).map(selector => {
    const el = getEl(view, selector);
    const builder = getBuilder(components, selector);

    if (!el || !builder) {
      return undefined;
    }

    const result = builder.apply(view);
    if (!result) {
      return undefined;
    }

    if (result.constructor === Array) {
      render(buildEnhancedComponent(...result), el);
    } else {
      render(result, el);
    }
  });
};

export default buildComponents;
