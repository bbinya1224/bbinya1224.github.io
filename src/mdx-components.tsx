import type { MDXComponents } from "mdx/types";
import { ImageCarousel } from "@/widgets/lab/ui/ImageCarousel/ImageCarousel";
import LifecycleLab from "@/widgets/lab/ui/lifecycle-lab/LifecycleLab";
import Mermaid from "@/widgets/lab/ui/Mermaid/Mermaid";

export const mdxComponents: MDXComponents = {
  LifecycleLab,
  Mermaid,
  ImageCarousel,

  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={(props.alt as string) || ""}
      className="mx-auto my-6 max-h-[500px] w-auto rounded-xl border object-contain shadow-lg dark:border-gray-800"
    />
  ),
};

export const useMDXComponents = (
  components: MDXComponents = {},
): MDXComponents => {
  return {
    ...components,
    ...mdxComponents,
  };
};
