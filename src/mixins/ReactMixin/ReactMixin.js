import { unmountComponentAtNode } from "react-dom";
import { buildComponents } from "./util";
import { result } from "../../util";

const ReactMixin = {
  initialize: function() {
    this.on("render", this.renderComponents, this);
    this.on("close", this.tearDownComponents, this);
  },

  renderComponents: function() {
    this.tearDownComponents();
    const components = result(this, "components");
    this._components = buildComponents(this, components);
  },

  tearDownComponents: function() {
    if (!this._components) {
      return;
    }

    this._components.forEach(el => {
      unmountComponentAtNode(el);
    });

    delete this._components;
  }
};

export default ReactMixin;
