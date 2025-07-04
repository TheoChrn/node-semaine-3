import * as furnitures from "./furnitures";
import * as materials from "./materials";
import * as auth from "./auth";
import * as users from "./users";

export const controllers = {
  ...furnitures,
  ...materials,
  ...auth,
  ...users,
};
