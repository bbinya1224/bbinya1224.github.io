import Category from "@/widgets/sidebar/ui/category/Category";
import Profile from "@/widgets/sidebar/ui/profile/Profile";
import Tag from "@/widgets/sidebar/ui/tag/Tag";

const Sidebar = () => {
  return (
    <article className="relative flex w-full flex-col gap-4 md:w-auto lg:max-w-72">
      <Profile />
      <Category />
      <Tag />
    </article>
  );
};

export default Sidebar;
