import type { ComponentPropsWithoutRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const wrapperVariants = tv({ base: "max-w-2xl mx-auto" });

interface WrapperProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof wrapperVariants> {}

export const Wrapper = ({ className, ...props }: WrapperProps) => (
  <div {...props} className={wrapperVariants({ className })}></div>
);
