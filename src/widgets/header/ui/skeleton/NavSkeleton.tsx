import Skeleton from "react-loading-skeleton";

const NAV_ITEM_COUNT = 3;
const NAV_ITEM_WIDTHS = [40, 32, 44];

const NavSkeleton = () => {
  return (
    <nav className="mt-5 flex gap-8">
      {Array.from({ length: NAV_ITEM_COUNT }).map((_, index) => (
        <div key={index} className="pb-2">
          <Skeleton width={NAV_ITEM_WIDTHS[index]} height={20} />
        </div>
      ))}
    </nav>
  );
};

export default NavSkeleton;
