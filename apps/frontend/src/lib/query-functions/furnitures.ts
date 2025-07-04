import type { GetAllFurniture } from "~/types";

export const fetchFurnitures = async (): Promise<GetAllFurniture | null> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/furnitures`);
    if (!res.ok) {
      return null;
    }
    const furnitures = await res.json();

    return furnitures.data;
  } catch (err) {
    return null;
  }
};
