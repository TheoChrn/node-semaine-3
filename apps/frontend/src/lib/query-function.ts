import * as getAllFurnitures from "./query-functions/furnitures";
import * as GetMaterialById from "./query-functions/materials";

export const queryFunction = {
  ...getAllFurnitures,
  ...GetMaterialById,
};
