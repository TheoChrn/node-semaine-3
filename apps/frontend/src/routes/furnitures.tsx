import * as Ariakit from "@ariakit/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { ButtonLink } from "~/components/button-link";
import { Wrapper } from "~/components/wrapper";

export const Route = createFileRoute("/furnitures")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Ariakit.HeadingLevel>
        <div className="p-4 ak-layer">
          <Wrapper>
            <div className="flex justify-between">
              <Ariakit.Heading className="text-2xl mb-4">
                Furnitures list
              </Ariakit.Heading>
              <ButtonLink
                className="flex gap-3 items-center"
                to="/furnitures/add"
              >
                <Plus /> Créer
              </ButtonLink>
            </div>
            <div className="flex gap-4 w-fit">
              <ButtonLink className="px-2 font-bold" to="/furnitures">
                Armoires
              </ButtonLink>
              <ButtonLink className="px-2 font-bold" to="/furnitures">
                Étagères
              </ButtonLink>
            </div>
          </Wrapper>
        </div>
      </Ariakit.HeadingLevel>
      <Outlet />
    </>
  );
}
