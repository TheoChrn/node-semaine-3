import type {
  FurnitureTypesValue,
  RawMaterialsValue,
  RawMaterialsValues,
  RawMaterialTypesValue,
  UserRole,
} from "@projet-node-semaine-3/shared/enums";

export type GetAllFurniture = {
  unGroupped: {
    id: string;
    value: string;
    quantity: number;
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
      quantity: number;
      materials: Record<
        RawMaterialTypesValue,
        { materials: { id: string; value: RawMaterialsValues }[] }
      >;
    }[]
  >;
};

export type GetMaterialById = {
  value: RawMaterialsValues;
  description: string;
};

export type User = {
  email: string;
  id: string;
  role: UserRole;
};

export type GetMaterialStats = {
  nElement: number;
  value: RawMaterialsValue;
}[];

export type GetFurnitureById = {
  id: string;
  value: string;
  quantity: number;
  type: FurnitureTypesValue;
  materials: RawMaterialsValue[];
};
