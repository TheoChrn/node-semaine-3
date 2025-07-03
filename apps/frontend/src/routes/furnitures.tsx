import * as Ariakit from "@ariakit/react";
import {
  furnitureTypesRecord,
  type FurnitureTypesValue,
} from "@projet-node-semaine-3/shared/enums";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { matchSorter } from "match-sorter";
import { useState } from "react";
import { Button } from "~/components/button";
import { ButtonLink } from "~/components/button-link";
import { Wrapper } from "~/components/wrapper";
import { queryOptions } from "~/lib/query-options";

export const Route = createFileRoute("/furnitures")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(queryOptions.getAllUnGroupped),
  component: RouteComponent,
});
function RouteComponent() {
  const { data } = useSuspenseQuery(queryOptions.getAllUnGroupped);
  const [furnitureType, setFurnitureType] =
    useState<FurnitureTypesValue>("armoire");

  const furnitures = matchSorter(data ?? [], furnitureType, {
    keys: ["type"],
  });

  return (
    <>
      <Ariakit.HeadingLevel>
        <div className="p-4 ak-layer">
          <Wrapper className="space-y-6">
            <div className="flex items-center justify-between">
              <Ariakit.Heading className="text-2xl mb-4">
                Furnitures list
              </Ariakit.Heading>
              <ButtonLink to="/furnitures/add">
                Créer <Plus />
              </ButtonLink>
            </div>
            <div className="flex gap-3 w-fit">
              <Button
                variant="outline"
                aria-selected={furnitureType === furnitureTypesRecord.ARMOIRE}
                className="px-2 font-bold"
                onClick={() => setFurnitureType(furnitureTypesRecord.ARMOIRE)}
              >
                Armoires
              </Button>
              <Button
                variant="outline"
                aria-selected={furnitureType === furnitureTypesRecord.ETAGERE}
                className="px-2 font-bold"
                onClick={() => setFurnitureType(furnitureTypesRecord.ETAGERE)}
              >
                Étagères
              </Button>
            </div>
            {furnitures?.length ? (
              <div className="grid grid-cols-3 gap-4">
                {furnitures.map((furniture) => (
                  <Ariakit.HeadingLevel key={furniture.id}>
                    <article key={furniture.id} className="space-y-3">
                      <div className="w-full aspect-square ak-layer-contrast" />
                      <div className="space-y-2">
                        <Ariakit.Heading className="text-2xl font-semibold">
                          {furniture.value}
                        </Ariakit.Heading>
                        <ul className="flex flex-wrap gap-x-1 gap-y-2">
                          {Object.values(furniture.materials).map(
                            ({ materials }) =>
                              materials.map((m) => (
                                <li key={m.id}>
                                  <span className="ak-frame ak-layer-pop py-1 px-3 capitalize">
                                    {m.value}
                                  </span>
                                </li>
                              ))
                          )}
                        </ul>
                      </div>
                    </article>
                  </Ariakit.HeadingLevel>
                ))}
              </div>
            ) : (
              <div>
                Il semble que vous n'avez pas encore créer de meuble dans cette
                catégorie
                <ButtonLink to="/furnitures/add">Créez le premier !</ButtonLink>
              </div>
            )}
          </Wrapper>
        </div>
      </Ariakit.HeadingLevel>
      <Outlet />
    </>
  );
}
