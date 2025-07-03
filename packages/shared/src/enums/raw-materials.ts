const woodMaterials = ["frêne", "chêne", "noyer"] as const;
const ironMaterials = ["acier", "inox", "aluminium"] as const;
const plasticMaterials = ["plastique"] as const;

export const rawMaterialsValues = [
  ...woodMaterials,
  ...ironMaterials,
  ...plasticMaterials,
] as const;

export type RawMaterialsValues = typeof rawMaterialsValues;
export type RawMaterialsValue = RawMaterialsValues[number];

export const rawMaterialsRecord = {
  FRENE: "frêne",
  CHENE: "chêne",
  NOYER: "noyer",
  ACIER: "acier",
  INOX: "inox",
  ALUMINIUM: "aluminium",
  PLASTIQUE: "plastique",
} as const satisfies Record<string, RawMaterialsValue>;
