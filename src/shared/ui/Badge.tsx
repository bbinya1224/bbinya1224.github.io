import cn from "@/shared/utils/cn";

type BadgeProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

const Badge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex cursor-default items-center justify-center rounded-full px-1 py-0.5 text-sm font-medium whitespace-nowrap transition-all duration-200 hover:shadow-md sm:px-2 sm:text-base",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
