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

type ProjectInput = Omit<Project, 'createdAt'>;

interface ProjectsProviderProps {
  children: ReactNode;
}

interface ProjectsContextData {
  projects: Project[],
  createProject: (project: ProjectInput) => Promise<void>,
  deleteProject: (projectID: string) => Promise<void>,
  installProject: (project: ProjectInput) => Promise<void>,
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

  async function installProject(projectInput: ProjectInput){
    const { dialog } = require('electron').remote
    dialog.showOpenDialog({ properties: ['openDirectory'] })
      .then(response => {
        const projectPath = response.filePaths[0];
        // Get and Install projects
        const filePath = `${projectPath}//TestFolder`

        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, {
            recursive: true
          });
        }

        fs.writeFile(`${filePath}//project-${projectInput.alias}.txt`, projectInput.alias, (err) => {
          if (err) throw err;
          console.log('Project saved!');
        });
        
        // Get and Install Configuration files
        // Get and Install Sites
        // Get and Install Databases
        console.log(response.filePaths)
        console.log(projectInput);
      });
  }

  return (
    <ProjectsContext.Provider value={{ projects, createProject, deleteProject, installProject}}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext);

  return context;
}