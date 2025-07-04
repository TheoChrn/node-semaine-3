import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import TanStackQueryLayout from "~/integrations/tanstack-query/layout.tsx";

import { type QueryClient } from "@tanstack/react-query";

import { Header } from "~/components/header.tsx";

export interface AuthContext {
  user: {
    id: string;
    email: string;
    role: "user" | "admin";
  };
}

export interface MyRouterContext {
  queryClient: QueryClient;
  auth: AuthContext | null;
}

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  loader: ({ context }) => {
    return { auth: context.auth };
  },
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </>
  ),
});
