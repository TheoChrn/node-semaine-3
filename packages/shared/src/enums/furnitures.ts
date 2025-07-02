export const furnitureTypesValues = ["armoire", "étagère"] as const;

export type FurnitureTypesValues = typeof furnitureTypesValues;
export type FurnitureTypesValue = FurnitureTypesValues[number];

export const furnitureTypesRecord = {
  ARMOIRE: "armoire",
  ETAGERE: "étagère",
} as const satisfies Record<string, FurnitureTypesValue>;
