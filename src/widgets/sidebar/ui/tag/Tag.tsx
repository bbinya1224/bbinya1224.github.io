import { getAllTags } from "@/entities/post/lib/getPostsByTag";
import TagList from "@/features/tag/ui/TagList";

const Tag = () => {
  const tags = getAllTags();

  return (
    <div className="card-base relative flex w-full flex-col gap-2 px-6 py-6 shadow-xl sm:p-4">
      <h2 className="text-2xl font-bold before:absolute before:top-[22px] before:left-[15px] before:h-6 before:w-1 before:rounded-md before:bg-amber-300 sm:pl-2">
        Tags
      </h2>

      <div className="mt-2">
        <TagList tags={tags} />
      </div>
    </div>
  );
};

export default Tag;
