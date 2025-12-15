import AboutMePage from "@/page/ui/AboutMePage";
import { getProjects } from "@/entities/project/lib/getProjects";

const AboutMe = async () => {
  const projects = await getProjects();
  return <AboutMePage projects={projects} />;
};

export default AboutMe;
