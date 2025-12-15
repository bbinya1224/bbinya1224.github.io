import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Project } from "@/entities/project/model/types";
import Badge from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

interface ProjectDetailDialogProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailDialog = ({
  project,
  isOpen,
  onClose,
}: ProjectDetailDialogProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white shadow-2xl sm:max-w-4xl dark:bg-[#1a1a1a]">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>

        <div className="my-2 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge
              key={tech}
              className="bg-secondary text-secondary-foreground"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          {project.content}
        </div>

        <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row">
          {project.repoUrl && (
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
          )}
          {project.demoUrl && (
            <Button asChild className="w-full sm:w-auto">
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
