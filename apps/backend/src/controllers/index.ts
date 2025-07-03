import * as furnitures from "./furnitures";
import * as materials from "./materials";
import * as auth from "./auth";

export const controllers = {
  ...furnitures,
  ...materials,
  ...auth,
};
