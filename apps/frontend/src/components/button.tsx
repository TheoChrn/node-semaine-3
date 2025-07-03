import * as Ariakit from "@ariakit/react";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: "inline-flex gap-3 border aria-selected:ak-layer-pop-10 hover:ak-layer-hover px-4 py-2.5 ak-frame focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors aria-disabled:opacity-50 aria-disabled:cursor-not-allowed cursor-pointer",
  variants: {
    variant: {
      primary: "ak-layer-primary",
      outline: "ak-layer",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends Ariakit.ButtonProps,
    VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant, ...props }: ButtonProps) => (
  <Ariakit.Button
    accessibleWhenDisabled
    className={buttonVariants({ className, variant })}
    {...props}
  />
);
