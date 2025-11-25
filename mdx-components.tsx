import type { MDXComponents } from "mdx/types";
import LifecycleLab from "@/widgets/lab/ui/lifecycle-lab/LifecycleLab";
import Mermaid from "@/widgets/lab/ui/Mermaid/Mermaid";

export const mdxComponents: MDXComponents = {
  LifecycleLab,
  Mermaid,
};

export const useMDXComponents = (
  components: MDXComponents = {},
): MDXComponents => {
  return {
    ...components,
    ...mdxComponents,
  };
};
