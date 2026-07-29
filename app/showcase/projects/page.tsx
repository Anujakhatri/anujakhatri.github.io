import { ProjectsPanel } from "@/components/projects";
import { PROJECTS } from "@/lib/site";

export default function ProjectsPage() {
  return <ProjectsPanel projects={PROJECTS} />;
}
