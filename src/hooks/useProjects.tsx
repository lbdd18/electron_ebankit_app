import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as fs from 'fs';

import { api } from "../services/api";

interface Project {
  id: number;
  name: string;
  alias: string;
  description: string;
  createdAt: Date;
}

type ProjectInput = Omit<Project, 'id' | 'createdAt'>;

interface ProjectsProviderProps {
  children: ReactNode;
}

interface ProjectsContextData {
  projects: Project[],
  createProject: (project: ProjectInput) => Promise<void>,
  deleteProject: (projectID: string) => Promise<void>
}

const ProjectsContext = createContext<ProjectsContextData>(
  {} as ProjectsContextData
);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.get('projects')
      .then(response => setProjects(response.data.projects))
  }, [])

  async function createProject(projectInput: ProjectInput) {
    const response = await api.post('projects', { ...projectInput, createdAt: new Date() });

    fs.writeFile(`c://temp//project-${projectInput.alias}.txt`, projectInput.alias, (err) => {
      if (err) throw err;
      console.log('Project saved!');
    });

    const { project } = response.data;
    setProjects([...projects, project])
  }

  async function deleteProject(projectID: string) {
    const response = await api.delete(`projects/${projectID}`);
    const { projects } = response.data;
    setProjects(projects);
  }

  return (
    <ProjectsContext.Provider value={{ projects, createProject, deleteProject}}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext);

  return context;
}