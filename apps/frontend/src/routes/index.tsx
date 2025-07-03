import { createFileRoute } from "@tanstack/react-router";
import * as Ariakit from "@ariakit/react";
import { queryOptions } from "~/lib/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Wrapper } from "~/components/wrapper";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(queryOptions.getAllGrouppedByFurnitureType),
  component: App,
});

function App() {
  const { data: furnitures } = useSuspenseQuery(
    queryOptions.getAllGrouppedByFurnitureType
  );

  return (
    <Ariakit.HeadingLevel>
      <div className="p-4 ak-layer">
        <Wrapper className="space-y-6">
          <Ariakit.Heading className="text-2xl mb-4">
            Furnitures list
          </Ariakit.Heading>

          {furnitures ? (
            <>
              {Object.entries(furnitures ?? []).map(([key, value]) => (
                <Ariakit.HeadingLevel key={key}>
                  <Ariakit.Heading className="text-2xl font-semibold capitalize">
                    {`${key}s`}
                  </Ariakit.Heading>
                  {value.map((furniture) => (
                    <Ariakit.HeadingLevel>
                      <article
                        key={furniture.id}
                        className="flex border ak-frame p-3 gap-8"
                      >
                        <div className="h-20 aspect-square ak-layer-contrast" />
                        <div className="my-auto space-y-2">
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
                </Ariakit.HeadingLevel>
              ))}
            </>
          ) : (
            <div>Aucun meuble créer pour le moment</div>
          )}
        </Wrapper>
      </div>
    </Ariakit.HeadingLevel>
  );
}
