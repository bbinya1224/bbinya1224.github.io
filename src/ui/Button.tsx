import { type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import cn from "@/lib/cn";

const buttonVariants = {
  variant: {
    default: "bg-primary text-canvas hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    outline:
      "border border-line bg-canvas hover:bg-surface hover:text-ink shadow-sm hover:shadow-md transition-all",
    secondary: "bg-surface text-ink hover:bg-surface/80",
    ghost: "hover:bg-surface hover:text-ink",
    link: "text-primary underline-offset-4 hover:underline",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  },
};

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  ref?: React.Ref<HTMLButtonElement>;
}

const Button = ({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ref,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "ring-offset-canvas focus-visible:ring-accent inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className,
      )}
      ref={ref}
      {...props}
    />
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
