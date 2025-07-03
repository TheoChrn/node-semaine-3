import {
  rawMaterialsTypeRecord,
  RawMaterialTypesValue,
} from "./raw-material-types";

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

export const rawMaterialsByType = {
  [rawMaterialsTypeRecord.BOIS]: [
    rawMaterialsRecord.FRENE,
    rawMaterialsRecord.CHENE,
    rawMaterialsRecord.NOYER,
  ],
  [rawMaterialsTypeRecord.FER]: [
    rawMaterialsRecord.ACIER,
    rawMaterialsRecord.ALUMINIUM,

    rawMaterialsRecord.INOX,
  ],
  [rawMaterialsTypeRecord.PLASTIQUE]: [rawMaterialsRecord.PLASTIQUE],
} as const satisfies Record<RawMaterialTypesValue, RawMaterialsValue[]>;

export const rawMaterialValueToId = {
  [rawMaterialsRecord.FRENE]: "325c93bf-3565-4a7a-8b76-718fbb519c42",
  [rawMaterialsRecord.CHENE]: "4b29ad2b-c1c7-476d-a5e1-2606d5082a0d",
  [rawMaterialsRecord.NOYER]: "4185aa7a-a25b-4184-9eee-5445b4d8e4a7",
  [rawMaterialsRecord.ACIER]: "5b8323a6-d0fd-4f57-8ff5-a29dd9dea566",
  [rawMaterialsRecord.ALUMINIUM]: "be880787-a529-4ed6-8ac6-5e5167eed348",
  [rawMaterialsRecord.INOX]: "6562292d-1b13-43a2-aa2d-a81e63f99767",
  [rawMaterialsRecord.PLASTIQUE]: "6da3b1b0-015d-4c4e-ae6e-cc901f681637",
} as const satisfies Record<RawMaterialsValue, string>;
