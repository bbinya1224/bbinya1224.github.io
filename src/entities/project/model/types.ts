import { ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  content: ReactNode;
}
