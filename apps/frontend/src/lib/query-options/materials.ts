import { queryOptions } from "@tanstack/react-query";
import { queryFunction } from "~/lib/query-function";

export const getById = (id: string) =>
  queryOptions({
    queryKey: ["material", id],
    queryFn: () => queryFunction.fetchMaterials(id),
  });
