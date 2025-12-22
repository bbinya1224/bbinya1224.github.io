import Link from "next/link";

interface CategoryCardProps {
  category: string;
  count: number;
}

const CategoryCard = ({ category, count }: CategoryCardProps) => {
  return (
    <Link
      href={`/blog?category=${encodeURIComponent(category)}`}
      className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-[#1c242c]"
    >
      <div>
        <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-amber-400 dark:text-white dark:group-hover:text-amber-400">
          {category}
        </h3>
      </div>
      <div className="mt-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {count} {count === 1 ? "story" : "stories"}
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
