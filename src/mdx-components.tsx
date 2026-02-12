import type { MDXComponents } from "mdx/types";
import AsChildDemo from "@/widgets/lab/ui/as-child-demo/AsChildDemo";
import ContextRerenderDemo from "@/widgets/lab/ui/context-rerender-demo/ContextRerenderDemo";
import ControlledDemo from "@/widgets/lab/ui/controlled-demo/ControlledDemo";
import FlickeringDemo from "@/widgets/lab/ui/flickering-demo/FlickeringDemo";
import { ImageCarousel } from "@/widgets/lab/ui/ImageCarousel/ImageCarousel";
import LifecycleLab from "@/widgets/lab/ui/lifecycle-lab/LifecycleLab";
import Mermaid from "@/widgets/lab/ui/Mermaid/Mermaid";
import RaceConditionDemo from "@/widgets/lab/ui/race-condition/RaceConditionDemo";
import VirtualScrollDemo from "@/widgets/lab/ui/virtual-scroll-demo/VirtualScrollDemo";

export const mdxComponents: MDXComponents = {
  AsChildDemo,
  ContextRerenderDemo,
  LifecycleLab,
  Mermaid,
  ImageCarousel,
  RaceConditionDemo,
  FlickeringDemo,
  ControlledDemo,
  VirtualScrollDemo,

  a: (props) => {
    const href = props.href || "";
    const isExternal =
      href.startsWith("http://") || href.startsWith("https://");

    if (isExternal) {
      return (
        <a {...props} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      );
    }

    return <a {...props}>{props.children}</a>;
  },

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
