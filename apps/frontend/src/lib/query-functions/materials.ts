import type { GetMaterialById, GetMaterialStats } from "~/types";

export const fetchMaterials = async (id: string): Promise<GetMaterialById> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/materials/${id}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const furnitures = await res.json();
    return furnitures.data;
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

export const fetchMaterialsStats = async (): Promise<GetMaterialStats> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/materials/stats`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const furnitures = await res.json();
    return furnitures.data;
  } catch (err) {
    throw new Error("Something went wrong");
  }
};
