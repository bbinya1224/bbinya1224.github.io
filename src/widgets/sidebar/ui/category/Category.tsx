import CateogryList from "@/features/category/ui/CategoryList";
import SidebarCardHeader from "@/widgets/sidebar/ui/SidebarCardHeader";

const Category = () => {
  return (
    <div className="card-base relative flex w-full flex-col gap-2 px-6 py-6 shadow-xl sm:p-4">
      <SidebarCardHeader contentType="Category" />

      <div>
        <CateogryList />
      </div>
    </div>
  );
};

export default Category;
