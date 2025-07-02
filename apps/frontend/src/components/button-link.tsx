import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type VariantProps } from "tailwind-variants";
import { buttonVariants } from "~/components/button";

interface ButtonLinkProps
  extends LinkComponentProps,
    VariantProps<typeof buttonVariants> {}

export const ButtonLink = ({ className, ...props }: ButtonLinkProps) => (
  <Link className={buttonVariants({ className })} {...props} />
);
