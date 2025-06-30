import * as users from "@/schemas/users";
import * as companies from "@/schemas/companies";
import * as furnitures from "@/schemas/furnitures";
import * as furnitureTypes from "@/schemas/furnitures-type";
import * as rawMaterials from "@/schemas/raw-materials";
import * as rawMaterialTypes from "@/schemas/raw-material-types";

export const schema = {
  ...users,
  ...companies,
  ...furnitures,
  ...furnitureTypes,
  ...rawMaterials,
  ...rawMaterialTypes,
};
