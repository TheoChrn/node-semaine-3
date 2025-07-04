import * as Ariakit from "@ariakit/react";
import {
  furnitureTypesRecord,
  type FurnitureTypesValue,
} from "@projet-node-semaine-3/shared/enums";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { matchSorter } from "match-sorter";
import { Fragment, useState } from "react";
import { Button } from "~/components/button";
import { ButtonLink } from "~/components/button-link";
import { Wrapper } from "~/components/wrapper";
import { queryOptions } from "~/lib/query-options";
import { currentUserQueryOptions } from "~/lib/query-options/auth";
import type { AuthContext } from "~/routes/__root";

export const Route = createFileRoute("/(authenticated)/admin/furnitures")({
  beforeLoad: async ({ context, location }) => {
    const user = await context.queryClient.ensureQueryData(
      currentUserQueryOptions()
    );

    context.auth = user;

    const isAuthenticated = !!user;

    if (!isAuthenticated && !location.pathname.startsWith("/auth")) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
          replace: true,
        },
      });
    }

    return {
      auth: user as AuthContext["user"],
    };
  },
  loader: ({ context: { queryClient, auth } }) => {
    queryClient.ensureQueryData(queryOptions.getAllGrouppedByFurnitureType());
    return { user: auth };
  },
  component: RouteComponent,
});
function RouteComponent() {
  const { user } = Route.useLoaderData();
  const { data: furnitures } = useSuspenseQuery(
    queryOptions.getAllGrouppedByFurnitureType()
  );

  return (
    <>
      <Ariakit.HeadingLevel>
        <div className="p-4 ak-layer overflow-hidden">
          <Wrapper className="space-y-10">
            <div className="flex items-center justify-between">
              <Ariakit.Heading className="text-2xl font-semibold">
                Liste des meubles
              </Ariakit.Heading>
              <ButtonLink to="/admin/furnitures/add">
                Créer <Plus />
              </ButtonLink>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full ">
                <thead>
                  <th />
                  <th className="px-6 pb-3">Nom</th>
                  <th className="px-6 pb-3">Quantité</th>
                  <th className="px-6 pb-3 text-start">Matériaux</th>
                  <th className="px-6 pb-3">Créateur</th>
                </thead>
                <tbody>
                  {furnitures && !!Object.entries(furnitures).length && (
                    <>
                      {Object.entries(furnitures).map(([key, val]) => (
                        <Fragment key={key}>
                          <tr className="border ">
                            <td className="p-3 capitalize ak-layer-pop-2 font-semibold">{`${key}s`}</td>
                            <td className="ak-layer-pop-2" />
                            <td className="ak-layer-pop-2" />
                            <td className="ak-layer-pop-2" />
                            <td className="ak-layer-pop-2" />
                          </tr>
                          {val.map((furniture) => (
                            <Fragment key={furniture.id}>
                              <tr className="border">
                                <td className="ak-layer-pop-1" />
                                <td className="p-3 ak-layer-pop-1 text-center">
                                  {furniture.value}
                                </td>
                                <td className="p-3 ak-layer-pop-1 text-center"></td>
                                <td className="capitalize flex flex-wrap  gap-1 justify-start p-3 ak-layer-pop-1">
                                  {Object.values(furniture.materials).map(
                                    ({ materials }) =>
                                      materials.map((m) => (
                                        <Link
                                          key={m.id}
                                          className="ak-frame border hover:ak-layer-hover-2 duration-100 ak-layer-pop py-1 px-3 capitalize"
                                          to="/materials/$materialId"
                                          params={{ materialId: m.id }}
                                        >
                                          {m.value}
                                        </Link>
                                      ))
                                  )}
                                </td>
                                <td className="p-3 ak-layer-pop-1 text-center">
                                  {user.email}
                                </td>
                              </tr>
                            </Fragment>
                          ))}
                        </Fragment>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {/* {furnitures && Object.entries(furnitures).length ? (
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(furnitures).map((furniture) => (
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
                <ButtonLink to="/admin/furnitures/add">
                  Créez le premier !
                </ButtonLink>
              </div>
            )} */}
          </Wrapper>
        </div>
      </Ariakit.HeadingLevel>
      <Outlet />
    </>
  );
}
