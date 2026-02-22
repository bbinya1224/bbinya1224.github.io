import { useEffect, useRef, useState } from 'react';
export interface PostMeta {
  id: string;
  title: string;
  date: string;
  slug: string;
  category?: string;
  tag?: string;
  description?: string;
  thumbnail?: string;
}

interface PostWidgetProps {
  title: string;
  date: string;
  category?: string;
  description?: string;
  slug: string;
  thumbnail?: string;
}

const PostWidget = ({ title, date, category, description, slug, thumbnail }: PostWidgetProps) => {
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group flex w-full flex-row justify-between gap-4 border-b border-gray-100 py-8 lg:max-w-[680px] dark:border-gray-800">
      <div className="flex flex-1 flex-col justify-center">
        <a href={`/posts/${slug}`}>
          <h2 className="mb-2 text-xl font-bold break-keep text-gray-900 transition-colors group-hover:text-amber-400 sm:text-2xl dark:text-gray-100 dark:group-hover:text-amber-400">
            {title}
          </h2>
          {description && (
            <p className="mb-4 line-clamp-3 text-base break-keep text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </a>
        <div className="flex flex-row items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <span>{formattedDate}</span>
          {category && (
            <>
              <span>·</span>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {category}
              </span>
            </>
          )}
        </div>
      </div>
      {thumbnail && (
        <a href={`/posts/${slug}`} className="relative hidden h-[166px] w-[160px] shrink-0 overflow-hidden sm:block">
          <img src={thumbnail} alt={title} className="h-full w-full object-contain" loading="lazy" />
        </a>
      )}
    </article>
  );
};

interface PostListIslandProps {
  posts: PostMeta[];
  batchSize?: number;
}

export default function PostListIsland({ posts, batchSize = 10 }: PostListIslandProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Read initial filter from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    const tags = params.getAll('tag');
    if (cat) setSelectedCategory(cat);
    if (tags.length > 0) setSelectedTags(tags);
  }, []);

  // Filter posts
  let filteredPosts = posts;
  if (selectedCategory) {
    filteredPosts = filteredPosts.filter((p) => p.category === selectedCategory);
  }
  if (selectedTags.length > 0) {
    filteredPosts = filteredPosts.filter((p) => {
      if (!p.tag) return false;
      const postTags = p.tag.split(',').map((t) => t.trim());
      return selectedTags.some((tag) => postTags.includes(tag));
    });
  }

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(batchSize);
  }, [selectedCategory, selectedTags, batchSize]);

  // Sync URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    selectedTags.forEach((tag) => params.append('tag', tag));
    const qs = params.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState(null, '', url);
  }, [selectedCategory, selectedTags]);

  // Infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + batchSize, filteredPosts.length));
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [batchSize, filteredPosts.length]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  // Clear filters
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
  };

  const hasFilters = selectedCategory || selectedTags.length > 0;

  return (
    <section className="mx-auto w-full">
      {hasFilters && (
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          {selectedCategory && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
              {selectedCategory}
            </span>
          )}
          {selectedTags.map((tag) => (
            <span key={tag} className="rounded-full bg-blue-100 px-3 py-1 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {tag}
            </span>
          ))}
          <button
            onClick={handleClearFilters}
            className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕ 초기화
          </button>
        </div>
      )}

      <div className="lg:[&>article:last-of-type]:border-b-0">
        {visiblePosts.length === 0 ? (
          <div className="flex min-h-[200px] items-center justify-center text-gray-500 dark:text-gray-400">
            <p>포스트가 없습니다.</p>
          </div>
        ) : (
          visiblePosts.map((post) => (
            <PostWidget
              key={post.id}
              title={post.title}
              date={post.date}
              category={post.category}
              description={post.description}
              slug={post.slug}
              thumbnail={post.thumbnail}
            />
          ))
        )}
      </div>
      {visibleCount < filteredPosts.length && <div ref={sentinelRef} className="h-10" />}
    </section>
  );
}
