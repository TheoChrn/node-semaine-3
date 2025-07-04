import { useStore } from "@tanstack/react-form";

import { useFieldContext, useFormContext } from "../hooks/form-context";
import { Button, type ButtonProps } from "~/components/button";
import type { ComponentPropsWithRef } from "react";

interface SubscribeButtonProps extends ButtonProps {
  label: string;
}
export function SubscribeButton({ label, ...props }: SubscribeButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
      {([isSubmitting, canSubmit]) => (
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || !canSubmit}
          {...props}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}

export function ErrorMessages({
  errors,
}: {
  errors: Array<{ message: string; [key: string]: any }>;
}) {
  return (
    <>
      {errors.map((error) => (
        <div
          key={typeof error === "string" ? error : error.message}
          className="ak-text-destructive/10 mt-1 font-bold text-sm"
        >
          {typeof error === "string" ? error : error.message}
        </div>
      ))}
    </>
  );
}

interface TextFieldProps extends ComponentPropsWithRef<"input"> {
  label: string;
}
export function TextField({
  label,
  placeholder,
  className,
  ...props
}: TextFieldProps) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <label
        htmlFor={label}
        className="block capitalize font-bold mb-1 text-xl"
      >
        {label}
        <input
          {...props}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className={`w-full px-4 py-2 rounded-md border ak-layer text-basez focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
        />
      </label>
      <ErrorMessages errors={errors} />
    </div>
  );
}

export function TextArea({
  label,
  rows = 3,
}: {
  label: string;
  rows?: number;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <label htmlFor={label} className="block font-bold mb-1 text-xl">
        {label}
        <textarea
          value={field.state.value}
          onBlur={field.handleBlur}
          rows={rows}
          onChange={(e) => field.handleChange(e.target.value)}
          className="w-full px-4 py-2 rounded-md border  ak-layer  focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

export function Select({
  label,
  values,
}: {
  label: string;
  values: Array<{ label: string; value: string }>;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <label htmlFor={label} className="block font-bold mb-1 text-xl">
        {label}
      </label>
      <select
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-4 py-2  ak-layer rounded-md border  focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {values.map((value) => (
          <option key={value.value} value={value.value}>
            {value.label}
          </option>
        ))}
      </select>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}
