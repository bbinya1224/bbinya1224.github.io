import Profile from "@/widgets/sidebar/ui/profile/Profile";
import SidebarFooter from "@/widgets/sidebar/ui/SidebarFooter";

const Sidebar = () => {
  return (
    <article className="relative flex w-full flex-col gap-4">
      <Profile />
      <SidebarFooter />
    </article>
  );
};

export default Sidebar;
