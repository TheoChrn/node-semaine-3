import * as Ariakit from "@ariakit/react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Pen, Trash } from "lucide-react";
import { Fragment } from "react";
import { Button } from "~/components/button";
import { ButtonLink } from "~/components/button-link";
import { queryOptions } from "~/lib/query-options";
import type { AuthContext } from "~/routes/__root";

export const FurnitureTable = (props: { user: AuthContext["user"] }) => {
  const queryClient = useQueryClient();
  const { data: furnitures } = useSuspenseQuery(
    queryOptions.furnitures.getAllGrouppedByFurnitureType()
  );

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/furnitures/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(res.statusText);
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["furnitures"] });
      queryClient.invalidateQueries({ queryKey: ["materialsStats"] });
    },
  });

  return (
    <div className="overflow-x-auto flex-1">
      <table className="w-max">
        <thead>
          <tr>
            <th />
            <th className="px-6 pb-3">Nom</th>
            <th className="px-6 pb-3">Quantité</th>
            <th className="px-6 pb-3 text-start">Matériaux</th>
            <th className="px-6 pb-3">Créateur</th>
            <th />
          </tr>
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
                    <td className="ak-layer-pop-2" />
                  </tr>
                  {val.map((furniture) => (
                    <Fragment key={furniture.id}>
                      <tr className="border">
                        <td className="ak-layer-pop-1" />
                        <td className="p-3 ak-layer-pop-1 text-center">
                          {furniture.value}
                        </td>
                        <td className="p-3 ak-layer-pop-1 text-center">
                          {furniture.quantity}
                        </td>
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
                          {props.user.email}
                        </td>
                        <td className="p-3 ak-layer-pop-1 flex items-center gap-1">
                          <ButtonLink
                            to="/admin/furnitures/$furnitureId/edit"
                            params={{ furnitureId: furniture.id }}
                            variant="icon"
                            className="hover:ak-layer-hover-3"
                          >
                            <Pen size={16} />
                            <Ariakit.VisuallyHidden>
                              Editer
                            </Ariakit.VisuallyHidden>
                          </ButtonLink>
                          <Button
                            variant="icon"
                            className="hover:ak-layer-hover ak-layer-destructive"
                            onClick={() => deleteMutation.mutate(furniture.id)}
                          >
                            <Trash size={16} />
                            <Ariakit.VisuallyHidden>
                              Supprimer
                            </Ariakit.VisuallyHidden>
                          </Button>
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
  );
};
