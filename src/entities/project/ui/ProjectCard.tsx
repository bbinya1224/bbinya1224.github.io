import Image from "next/image";
import { Project } from "@/entities/project/model/types";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/Card";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <Card
      className="group dark:hover:shadow-primary/10 w-full cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:shadow-2xl"
      onClick={() => onClick(project)}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            fill
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl font-bold text-gray-300 dark:text-gray-700">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardHeader className="space-y-2">
        <CardTitle className="group-hover:text-primary text-lg font-semibold transition-colors dark:text-gray-100">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {project.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
