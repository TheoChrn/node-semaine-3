import type {
  FurnitureTypesValue,
  RawMaterialsValues,
  RawMaterialTypesValue,
} from "@projet-node-semaine-3/shared/enums";

export type GetAllFurniture = {
  unGroupped: {
    id: string;
    value: string;
    keyword: string | null;
    type: FurnitureTypesValue;
    materials: Record<
      RawMaterialTypesValue,
      { materials: { id: string; value: RawMaterialsValues }[] }
    >;
  }[];
  groupped: Record<
    FurnitureTypesValue,
    {
      id: string;
      value: string;
      keyword: string | null;
      materials: Record<
        RawMaterialTypesValue,
        { materials: { id: string; value: RawMaterialsValues }[] }
      >;
    }[]
  >;
};
