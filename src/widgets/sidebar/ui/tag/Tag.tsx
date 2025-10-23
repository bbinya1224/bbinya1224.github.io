import TagList from "@/features/tag/ui/TagList";
import SidebarCardHeader from "../SidebarCardHeader";

const Tag = () => {
  return (
    <div className="card-base relative flex w-full flex-col gap-2 px-6 py-6 shadow-xl sm:p-4">
      <SidebarCardHeader contentType="Tag" />

      <div className="mt-2">
        <TagList />
      </div>
    </div>
  );
};

export default Tag;
