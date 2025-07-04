import {
  loginUserSchema,
  type LoginUserInput,
} from "@projet-node-semaine-3/shared/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Wrapper } from "~/components/wrapper";
import { useAppForm } from "~/hooks/form";

export const Route = createFileRoute("/(auth)/auth/_pathlessLayout/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, error } = useMutation({
    mutationFn: async (credentials: LoginUserInput) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        const error = data.message;

        throw new Error(error);
      }

      return data.data;
    },
    onSuccess: async (data) => {
      await queryClient.setQueryData(["currentUser"], data);
      navigate({
        to: "/admin/furnitures",
        replace: true,
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
    validators: { onChange: loginUserSchema },
  });

  console.log(error?.message);

  return (
    <Wrapper className="flex-1  place-content-center max-w-md w-full">
      <div className="p-8 ak-layer-down-1 space-y-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 rounded"
        >
          <div className="space-y-4">
            <form.AppField name="email">
              {(field) => <field.TextField label="email" />}
            </form.AppField>
            <form.AppField name="password">
              {(field) => <field.TextField label="password" type="password" />}
            </form.AppField>
          </div>

          {error && (
            <div className="ak-layer-destructive-10 border ak-frame p-3">
              <span className="ak-text-destructive">{error.message}</span>
            </div>
          )}

          <div className="flex justify-end">
            <form.AppForm>
              <form.SubscribeButton
                label="Se connecter"
                variant="primary"
                className="w-full justify-center"
              />
            </form.AppForm>
          </div>
        </form>
        <div className="text-center ak-text">
          Vous n'avez pas encore de compte ?{" "}
          <Link to="/auth/register" className="ak-text-primary font-semibold">
            Inscrivez-vous
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}
