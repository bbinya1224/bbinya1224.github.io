import { getProjects } from "@/entities/project/lib/getProjects";
import AboutMePage from "@/page/ui/AboutMePage";

const AboutMe = async () => {
  const projects = await getProjects();
  return <AboutMePage projects={projects} />;
};

export default AboutMe;
