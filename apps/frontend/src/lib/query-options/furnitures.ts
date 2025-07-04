import { queryOptions } from "@tanstack/react-query";
import { queryFunction } from "~/lib/query-function";

export const furnitures = {
  getAllUnGroupped: () =>
    queryOptions({
      queryKey: ["furnitures"],
      queryFn: () => queryFunction.furnitures.fetchFurnitures(),
      select: (res) => res?.unGroupped,
    }),
  getAllGrouppedByFurnitureType: () =>
    queryOptions({
      queryKey: ["furnitures"],
      queryFn: () => queryFunction.furnitures.fetchFurnitures(),
      select: (res) => res?.groupped,
    }),
  getById: (id: string) =>
    queryOptions({
      queryKey: ["furniture", id],
      queryFn: () => queryFunction.furnitures.fetchFurnitureById(id),
    }),
};
