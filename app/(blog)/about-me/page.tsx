import type { Metadata } from "next";
import { getProjects } from "@/entities/project/lib/getProjects";
import AboutMePage from "@/page/ui/AboutMePage";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bbinya1224.github.io/about-me",
  },
};

const AboutMe = async () => {
  const projects = await getProjects();
  return <AboutMePage projects={projects} />;
};

export default AboutMe;
