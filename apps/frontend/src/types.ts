import type {
  FurnitureTypesValue,
  RawMaterialsValues,
  RawMaterialTypesValue,
} from "@projet-node-semaine-3/shared/enums";

export type GetAllFurniture = {
  id: string;
  value: string;
  keyword: string | null;
  type: FurnitureTypesValue;
  materials: Record<
    RawMaterialTypesValue,
    { materials: { id: string; value: RawMaterialsValues }[] }
  >;
}[];
