import cn from "@/shared/utils/cn";
import Profile from "@/widgets/sidebar/ui/Profile";

const Sidebar = () => {
  return (
    <article className={cn("relative mt-4 w-full lg:w-auto")}>
      <Profile />
    </article>
  );
};

export default Sidebar;
