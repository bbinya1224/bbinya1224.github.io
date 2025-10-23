import { Suspense } from "react";
import Category from "@/widgets/sidebar/ui/category/Category";
import Profile from "@/widgets/sidebar/ui/profile/Profile";
import Tag from "@/widgets/sidebar/ui/tag/Tag";

const Sidebar = () => {
  return (
    <article className="relative flex w-full flex-col gap-4 md:w-auto">
      <Profile />
      <Suspense
        fallback={<div className="animate-pulse">카테고리 로딩...</div>}
      >
        <Category />
      </Suspense>

      <Suspense fallback={<div className="animate-pulse">태그 로딩...</div>}>
        <Tag />
      </Suspense>
    </article>
  );
};

export default Sidebar;
