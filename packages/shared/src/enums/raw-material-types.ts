export const rawMaterialTypeValue = ["bois", "fer", "plastique"] as const;

export type RawMaterialTypesValues = typeof rawMaterialTypeValue;
export type RawMaterialTypesValue = RawMaterialTypesValues[number];

export const rawMaterialsTypeRecord = {
  BOIS: "bois",
  FER: "fer",
  PLASTIQUE: "plastique",
} as const satisfies Record<string, RawMaterialTypesValue>;
