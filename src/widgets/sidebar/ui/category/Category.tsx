import { getAllCategories } from "@/entities/post/lib/getCategories";
import CateogryList from "@/features/category/ui/CategoryList";

const Category = () => {
  const categories = getAllCategories();

  return (
    <div className="card-base relative flex w-full flex-col gap-2 px-6 py-6 shadow-xl sm:p-4">
      <h2 className="text-2xl font-bold before:absolute before:top-[22px] before:left-[15px] before:h-6 before:w-1 before:rounded-md before:bg-amber-300 sm:pl-2">
        Categories
      </h2>

      <div>
        <CateogryList categories={categories} />
      </div>
    </div>
  );
};

export default Category;
