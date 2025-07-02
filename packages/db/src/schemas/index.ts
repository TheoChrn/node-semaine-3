import * as users from "./users";
import * as companies from "./companies";
import * as furnitures from "./furnitures";
import * as rawMaterials from "./raw-materials";
import * as rawMaterialTypes from "./raw-material-types";
import * as furnituresRawMaterials from "./furnitures-materials";

export const schema = {
  ...users,
  ...companies,
  ...furnitures,
  ...rawMaterials,
  ...rawMaterialTypes,
  ...furnituresRawMaterials,
};
