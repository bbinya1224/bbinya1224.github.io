import cn from "@/shared/utils/cn";
import Profile from "@/widgets/sidebar/ui/Profile";

const Sidebar = ({ className }: { className?: string }) => {
  return (
    <article className={cn("relative mt-4", className)}>
      <Profile />
    </article>
  );
};

export default Sidebar;
