import { DialogDismiss, DialogHeading } from "@ariakit/react";

import {
  furnitureTypesRecord,
  furnitureTypesValues,
  rawMaterialsByType,
  type FurnitureTypesValue,
  type RawMaterialsValue,
} from "@projet-node-semaine-3/shared/enums";
import {
  furnitureFormSchema,
  type FurnitureFormInput,
} from "@projet-node-semaine-3/shared/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Dialog } from "~/components/dialog";
import { useAppForm } from "~/hooks/form";
import * as Ariakit from "@ariakit/react";

import { buttonVariants } from "~/components/button";
import { Fragment } from "react/jsx-runtime";
import { ErrorMessages } from "~/components/form-components";

export const Route = createFileRoute("/(protected)/admin/furnitures/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: async (furniture: FurnitureFormInput) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/furnitures`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(furniture),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["furnitures"] });
      queryClient.invalidateQueries({ queryKey: ["materialsStats"] });
      navigate({
        to: "/admin/furnitures",
        replace: true,
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      value: "",
      type: furnitureTypesRecord.ARMOIRE as FurnitureTypesValue,
      rawMaterials: [] as RawMaterialsValue[],
      quantity: "1",
    },
    validators: { onChange: furnitureFormSchema },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  return (
    <Dialog onClose={() => navigate({ to: "/admin/furnitures" })}>
      <form
        className="relative space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex justify-between items-center">
          <DialogHeading className="heading text-4xl font-semibold">
            Créer une nouvelle furniture
          </DialogHeading>
          <DialogDismiss className="absolute top-0 right-0 cursor-pointer">
            <Plus className="rotate-45" />
          </DialogDismiss>
        </div>
        <div className="flex gap-3">
          <form.AppField name="value">
            {(field) => <field.TextField label="Title" />}
          </form.AppField>
          <form.AppField name="quantity">
            {(field) => <field.TextField label="Quantité" type="number" />}
          </form.AppField>
        </div>

        <div className="flex gap-3">
          <form.Field name="rawMaterials">
            {(field) => (
              <div className="flex-1">
                <Ariakit.SelectProvider
                  value={field.state.value}
                  setValue={(values: RawMaterialsValue[]) =>
                    field.handleChange(values)
                  }
                >
                  <div>
                    <Ariakit.SelectLabel>Matériaux</Ariakit.SelectLabel>
                    <Ariakit.Select
                      className={buttonVariants({
                        className: "items-center aria-expanded:rounded-b-none",
                      })}
                    >
                      {`${field.state.value.length} matériaux sélectionné${
                        field.state.value.length > 1 ? `s` : ``
                      }`}
                      <Ariakit.SelectArrow />
                    </Ariakit.Select>
                  </div>

                  <Ariakit.SelectPopover
                    flip="bottom"
                    sameWidth
                    className="ak-layer-5 space-y-2 overflow-y-auto max-h-52 ak-frame rounded-t-none"
                  >
                    {Object.entries(rawMaterialsByType).map(([key, value]) => (
                      <Fragment key={key}>
                        <div className="space-y-4">
                          <span className="capitalize">{key}</span>

                          <ul>
                            {value.map((material) => (
                              <Ariakit.SelectItem
                                key={material}
                                value={material}
                                render={<li />}
                                className="flex items-center-safe px-3 py-2 cursor-pointer hover:ak-layer-hover-primary capitalize"
                              >
                                <Ariakit.SelectItemCheck
                                  checked={field.state.value.includes(material)}
                                />
                                {material}
                              </Ariakit.SelectItem>
                            ))}
                          </ul>
                        </div>
                        <Ariakit.Separator />
                      </Fragment>
                    ))}
                  </Ariakit.SelectPopover>
                </Ariakit.SelectProvider>
                {field.state.meta.errors.length > 0 && (
                  <ErrorMessages errors={field.state.meta.errors as any[]} />
                )}
              </div>
            )}
          </form.Field>
          <form.Field name="type">
            {(field) => (
              <Ariakit.SelectProvider
                value={field.state.value}
                setValue={(value: FurnitureTypesValue) =>
                  field.handleChange(value)
                }
              >
                <div className="flex-1">
                  <Ariakit.SelectLabel>Type de meuble</Ariakit.SelectLabel>
                  <Ariakit.Select
                    className={buttonVariants({
                      className:
                        "items-center aria-expanded:rounded-b-none capitalize",
                    })}
                  >
                    {field.state.value}
                    <Ariakit.SelectArrow />
                  </Ariakit.Select>
                </div>

                <Ariakit.SelectPopover
                  flip="bottom"
                  sameWidth
                  className="ak-layer-5 space-y-2 overflow-y-auto max-h-52 ak-frame rounded-t-none"
                >
                  {furnitureTypesValues.map((type) => (
                    <Ariakit.SelectItem
                      key={type}
                      value={type}
                      render={<li />}
                      className="flex items-center-safe px-3 py-2 cursor-pointer hover:ak-layer-hover-primary capitalize"
                    >
                      <Ariakit.SelectItemCheck
                        checked={field.state.value.includes(type)}
                      />
                      {type}
                    </Ariakit.SelectItem>
                  ))}
                </Ariakit.SelectPopover>
              </Ariakit.SelectProvider>
            )}
          </form.Field>
        </div>

        <div className="flex justify-end">
          {error && (
            <div className="ak-layer-destructive-10 border ak-frame p-3">
              <span className="ak-text-destructive">{error.message}</span>
            </div>
          )}
          <form.AppForm>
            <form.SubscribeButton label="Créer" />
          </form.AppForm>
        </div>
      </form>
    </Dialog>
  );
}
