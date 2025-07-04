import * as getAllFurnitures from "./query-functions/furnitures";
import * as materials from "./query-functions/materials";

export const queryFunction = {
  ...getAllFurnitures,
  ...materials,
};
