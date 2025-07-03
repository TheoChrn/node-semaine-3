import type { GetMaterialById } from "~/types";

export const fetchMaterials = async (id: string): Promise<GetMaterialById> => {
  try {
    const res = await fetch(`http://localhost:3000/api/materials/${id}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const furnitures = await res.json();
    return furnitures.data;
  } catch (err) {
    throw new Error("Something went wrong");
  }
};
