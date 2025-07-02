import * as Ariakit from "@ariakit/react";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: "ak-layer-pop-10 hover:ak-layer-hover px-4 py-2.5 ak-frame focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
});

interface ButtonProps
  extends Ariakit.ButtonProps,
    VariantProps<typeof buttonVariants> {}

export const Button = ({ className, ...props }: ButtonProps) => (
  <Ariakit.Button
    accessibleWhenDisabled
    className={buttonVariants({ className })}
    {...props}
  />
);
