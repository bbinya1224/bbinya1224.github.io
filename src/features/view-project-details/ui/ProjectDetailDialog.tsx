import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Project } from "@/entities/project/model/types";
import GithubIcon from "@/shared/icons/ic_github.svg";
import { Button } from "@/shared/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog";

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
      <DialogContent className="max-h-[90vh] overflow-y-auto border-none bg-white/95 shadow-2xl backdrop-blur-xl sm:max-w-4xl dark:bg-[#1a1a1a]/95">
        <DialogHeader className="space-y-3">
          <DialogTitle className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-3xl font-extrabold text-transparent dark:from-white dark:to-gray-400">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-lg font-medium text-gray-500 dark:text-gray-400">
            기간: {project.period}
          </DialogDescription>
          <DialogDescription className="text-lg font-medium text-gray-500 dark:text-gray-400">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-gray-700 dark:text-gray-300">
          {project.content}
        </div>

        <DialogFooter className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row dark:border-gray-800">
          {project.repoUrl && (
            <Button
              asChild
              variant="outline"
              className="h-11 w-full gap-2 border-gray-300 transition-colors hover:bg-gray-100 sm:w-auto dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="h-5 w-5 fill-current" />
                GitHub 저장소
              </Link>
            </Button>
          )}
          {project.demoUrl && (
            <Button
              asChild
              className="h-11 w-full gap-2 bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-500/30 sm:w-auto"
            >
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                라이브 데모
              </Link>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
