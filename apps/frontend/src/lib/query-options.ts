import * as furnitureOptions from "./query-options/furnitures";
import * as materialOptions from "./query-options/materials";
import * as authOptions from "./query-options/auth";

export const queryOptions = {
  ...furnitureOptions,
  ...materialOptions,
  ...authOptions,
};
