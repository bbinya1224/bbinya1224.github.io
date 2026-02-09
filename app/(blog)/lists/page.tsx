import type { Metadata } from "next";
import CategoryCollection from "@/widgets/category-collection/ui/CategoryCollection";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bbinya1224.github.io/lists",
  },
};

export default function ListsPage() {
  return <CategoryCollection />;
}
