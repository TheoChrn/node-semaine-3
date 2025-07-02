import { DialogDismiss, DialogHeading } from "@ariakit/react";

import {
  createFurnitureSchema,
  type CreateFurnitureInput,
} from "@projet-node-semaine-3/shared/validators";
import {
  furnitureTypesRecord,
  type FurnitureTypesValue,
} from "@projet-node-semaine-3/shared/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Dialog } from "~/components/dialog";
import { useAppForm } from "~/hooks/form";

export const Route = createFileRoute("/furnitures/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: async (furniture: CreateFurnitureInput) => {
      const res = await fetch(`http://localhost:3000/api/furnitures`, {
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
      console.log("success");
      await queryClient.invalidateQueries({ queryKey: ["furnitures"] });
      navigate({
        to: "/furnitures",
        replace: true,
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      value: "",
      keyword: "",
      createdBy: "5bfe7dec-a83c-4348-8d5e-c157e678de8e",
      type: furnitureTypesRecord.ARMOIRE as FurnitureTypesValue,
      rawMaterials: [
        "0e1e48d9-6eb3-49ab-b056-2a1b85f4e1f3",
        "29992cc7-2421-43a0-a232-a9329f9afa61",
      ],
    },
    validators: { onChange: createFurnitureSchema },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  return (
    <Dialog onClose={() => navigate({ to: "/furnitures" })}>
      <form
        className="relative space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex justify-between items-center">
          <DialogHeading className="heading">
            Créer une nouvelle furniture
          </DialogHeading>
          <DialogDismiss className="absolute top-0 right-0 cursor-pointer">
            <Plus className="rotate-45" />
          </DialogDismiss>
        </div>
        <form.AppField name="value">
          {(field) => <field.TextField label="Title" />}
        </form.AppField>
        <form.AppField name="keyword">
          {(field) => <field.TextField label="Keyword" />}
        </form.AppField>
        <div className="flex justify-end">
          {error && (
            <div className="ak-layer-destructive-10 border ak-frame p-3">
              <span className="ak-text-destructive">{error.message}</span>
            </div>
          )}
          <form.AppForm>
            <form.SubscribeButton label="Submit" />
          </form.AppForm>
        </div>
      </form>
    </Dialog>
  );
}
