import {
  registerUserSchema,
  type RegisterUserInput,
} from "@projet-node-semaine-3/shared/validators";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Wrapper } from "~/components/wrapper";
import { useAppForm } from "~/hooks/form";

export const Route = createFileRoute("/(auth)/auth/_pathlessLayout/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { mutate, error } = useMutation({
    mutationFn: async (credentials: RegisterUserInput) => {
      const res = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
    },
    onSuccess: async () => {
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
      confirmPassword: "",
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
    validators: { onChange: registerUserSchema },
  });

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
            <form.AppField
              name="confirmPassword"
              validators={{ onChangeListenTo: ["password"] }}
            >
              {(field) => (
                <field.TextField label="confirm password" type="password" />
              )}
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
                label="S'inscrire"
                variant="primary"
                className="w-full justify-center"
              />
            </form.AppForm>
          </div>
        </form>
        <div className="text-center ak-text">
          Vous avez déjà un compte ?{" "}
          <Link to="/auth/login" className="ak-text-primary font-semibold">
            Connectez-vous
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}
