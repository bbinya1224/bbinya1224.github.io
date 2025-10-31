import CateogryList from "@/features/category/ui/CategoryList";
import SidebarCardHeader from "@/widgets/sidebar/ui/SidebarCardHeader";

const Category = () => {
  return (
    <div className="card-base flex w-full flex-col gap-2 px-6 py-6 shadow-xl sm:p-4 md:relative">
      <SidebarCardHeader contentType="Category" />
      <CateogryList />
    </div>
  );
};

export default Category;
