import type { GetAllFurniture, GetFurnitureById } from "~/types";

export const furnitures = {
  fetchFurnitures: async (): Promise<GetAllFurniture | null> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/furnitures`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        return null;
      }

      const furnitures = await res.json();

      return furnitures.data;
    } catch (err) {
      return null;
    }
  },
  fetchFurnitureById: async (id: string): Promise<GetFurnitureById | null> => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/furnitures/${id}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        return null;
      }
      const furnitures = await res.json();

      return furnitures.data;
    } catch (err) {
      return null;
    }
  },
};
