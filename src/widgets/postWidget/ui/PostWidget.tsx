import ArrowIcon from "@/shared/icons/ic_arrow.svg";
import Link from "next/link";

const PostWidget = () => {
  return (
    <article className="card-base relative flex h-48 w-full flex-row justify-between px-6 py-6 shadow-lg md:py-4 md:pr-2 md:pl-9">
      <div>
        <h2 className="group mb-3 flex w-full cursor-pointer items-center gap-2 text-3xl font-bold transition before:absolute before:top-[26px] before:left-[18px] before:hidden before:h-5 before:w-1 before:rounded-md before:bg-amber-300 hover:text-amber-400 md:before:block dark:hover:text-amber-400">
          Post Title
          <ArrowIcon
            className="mt-1 size-6 -translate-x-2 text-amber-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden="true"
          />
        </h2>

        <div>
          <span>날짜 아이콘 및 날짜</span>
          <span>카테고리</span>
          <span>태그</span>
        </div>
        <div>
          <p>Post desc</p>
        </div>
      </div>
      <div className="relative h-full w-1/10">
        <Link href="">
          <div className="h-full rounded-md bg-slate-100 transition-all duration-200 hover:bg-slate-200 dark:bg-[#11161b] dark:hover:bg-[#222933]">
            <ArrowIcon
              className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 text-amber-300"
              aria-hidden="true"
            />
          </div>
        </Link>
      </div>
    </article>
  );
};

export default PostWidget;
