import * as Ariakit from "@ariakit/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "~/components/button-link";
import { Wrapper } from "~/components/wrapper";
import { queryOptions } from "~/lib/query-options";

export const Route = createFileRoute("/materials/$materialId")({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { materialId } }) =>
    queryClient.ensureQueryData(queryOptions.getById(materialId)),
});

function RouteComponent() {
  const materialId = Route.useParams().materialId;
  const { data: material } = useSuspenseQuery(queryOptions.getById(materialId));

  return (
    <Ariakit.HeadingLevel>
      <Wrapper className="space-y-6">
        <div className="flex items-center gap-3">
          <ButtonLink to="/" variant="outline">
            <ArrowLeft />
            <Ariakit.VisuallyHidden>Retour</Ariakit.VisuallyHidden>
          </ButtonLink>
          <Ariakit.Heading className="capitalize font-semibold text-5xl">
            {material.value}
          </Ariakit.Heading>
        </div>

        <Ariakit.Separator />
        <p>{material.description}</p>
      </Wrapper>
    </Ariakit.HeadingLevel>
  );
}
