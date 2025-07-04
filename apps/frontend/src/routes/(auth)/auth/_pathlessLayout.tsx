import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { currentUserQueryOptions } from "~/lib/query-options/auth";
import type { AuthContext } from "~/routes/__root";

export const Route = createFileRoute("/(auth)/auth/_pathlessLayout")({
  beforeLoad: async ({ context, location }) => {
    const user = await context.queryClient.ensureQueryData(
      currentUserQueryOptions()
    );

    context.auth = user;

    const isAuthenticated = !!user;

    if (isAuthenticated && location.pathname.startsWith("/auth")) {
      throw redirect({
        to: "/",
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
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
