import { applyMixin } from "./util";
import { ReactMixin } from "./mixins";

const brigade = view => applyMixin(view, ReactMixin);

export default brigade;
