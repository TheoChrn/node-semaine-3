import { createFileRoute, Link } from "@tanstack/react-router";
import * as Ariakit from "@ariakit/react";
import { queryOptions } from "~/lib/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Wrapper } from "~/components/wrapper";

export const Route = createFileRoute("/(landing-page)/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(
      queryOptions.furnitures.getAllGrouppedByFurnitureType()
    ),
  component: App,
});

function App() {
  const { data: furnitures } = useSuspenseQuery(
    queryOptions.furnitures.getAllGrouppedByFurnitureType()
  );

  return (
    <Ariakit.HeadingLevel>
      <div className="flex-1 flex p-8 ak-layer">
        {furnitures && Object.entries(furnitures).length ? (
          <Wrapper className="space-y-8">
            {Object.entries(furnitures ?? []).map(([key, value]) => (
              <div className="flex-1 space-y-4" key={key}>
                <Ariakit.HeadingLevel key={key}>
                  <Ariakit.Heading className="text-2xl font-semibold capitalize">
                    {`${key}s`}
                  </Ariakit.Heading>
                  <div className="grid lg:grid-cols-2 gap-4">
                    {value.map((furniture) => (
                      <Ariakit.HeadingLevel key={furniture.id}>
                        <article
                          key={furniture.id}
                          className="flex border ak-frame ak-layer-down p-3 gap-4"
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
                                      <Link
                                        to="/materials/$materialId"
                                        params={{ materialId: m.id }}
                                      >
                                        <span className="ak-frame border hover:ak-layer-hover-2 duration-100 ak-layer-5 py-1 px-3 capitalize">
                                          {m.value}
                                        </span>
                                      </Link>
                                    </li>
                                  ))
                              )}
                            </ul>
                          </div>
                          <span className="my-auto ml-auto">
                            x{furniture.quantity}
                          </span>
                        </article>
                      </Ariakit.HeadingLevel>
                    ))}
                  </div>
                </Ariakit.HeadingLevel>
              </div>
            ))}
          </Wrapper>
        ) : (
          <div className="text-5xl text-center w-full font-bold my-auto">
            Aucun meuble créer pour le moment
          </div>
        )}
      </div>
    </Ariakit.HeadingLevel>
  );
}
