import * as Ariakit from "@ariakit/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { ButtonLink } from "~/components/button-link";
import { FurnitureTable } from "~/components/furniture-table";
import { MaterialsGraph } from "~/components/materials-graph";
import { queryOptions } from "~/lib/query-options";
import { currentUserQueryOptions } from "~/lib/query-options/auth";
import type { AuthContext } from "~/routes/__root";

export const Route = createFileRoute("/(protected)/admin/furnitures")({
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
    queryClient.ensureQueryData(
      queryOptions.furnitures.getAllGrouppedByFurnitureType()
    );
    queryClient.ensureQueryData(queryOptions.materials.getStats());
    return { user: auth };
  },
  component: RouteComponent,
});
function RouteComponent() {
  const { user } = Route.useLoaderData();

  return (
    <>
      <Ariakit.HeadingLevel>
        <div className="p-8 ak-layer overflow-hidden">
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <Ariakit.Heading className="text-2xl font-semibold">
                Liste des meubles
              </Ariakit.Heading>
              <ButtonLink to="/admin/furnitures/add">
                Créer <Plus />
              </ButtonLink>
            </div>
            <div className="flex gap-3">
              <FurnitureTable user={user} />
              <MaterialsGraph />
            </div>
          </div>
        </div>
      </Ariakit.HeadingLevel>
      <Outlet />
    </>
  );
}
