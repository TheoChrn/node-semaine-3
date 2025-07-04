import React, { Fragment } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "~/lib/query-options";
import { Link } from "@tanstack/react-router";
import type { AuthContext } from "~/routes/__root";

export const FurnitureTable = (props: { user: AuthContext["user"] }) => {
  const { data: furnitures } = useSuspenseQuery(
    queryOptions.getAllGrouppedByFurnitureType()
  );
  return (
    <div className="overflow-x-auto">
      <table className="w-full ">
        <thead>
          <tr>
            <th />
            <th className="px-6 pb-3">Nom</th>
            <th className="px-6 pb-3">Quantité</th>
            <th className="px-6 pb-3 text-start">Matériaux</th>
            <th className="px-6 pb-3">Créateur</th>
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
                          {props.user.email}
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
