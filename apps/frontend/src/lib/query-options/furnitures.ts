import { queryOptions } from "@tanstack/react-query";
import { queryFunction } from "~/lib/query-function";

export const getAllUnGroupped = queryOptions({
  queryKey: ["furnitures"],
  queryFn: () => queryFunction.fetchFurnitures(),
  select: (res) => res?.unGroupped,
});
export const getAllGrouppedByFurnitureType = queryOptions({
  queryKey: ["furnitures"],
  queryFn: () => queryFunction.fetchFurnitures(),
  select: (res) => res?.groupped,
});
