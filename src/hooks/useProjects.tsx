import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as fs from 'fs';
import * as cmd from 'child_process';
import os from 'os'
import extract from 'extract-zip';

import { api } from "../services/api";
import { useSnackbar } from "notistack";

interface Project {
  id: string;
  name: string;
  template: string;
  version: string;
  description: string;
  alias: string;
  author: string;
  customer: string;
  instance: string;
  sqlUser: string;
  sqlPassword: string;
  isInstalledWindows: boolean;
  isInstalledMac: boolean;
}

interface Environment {
  id: number;
  name: string;
  instance: string;
  sqlUser: string;
  sqlPassword: string;
}

interface Site {
  id: number;
  name: string;
}


interface Package {
  id: number;
  name: string;
  description: string;
  path: string;
  templateName: string;
  isMacOS: boolean;
}

interface PackageFile {
  name: string;
  path: string;
  fileType: {
    name: string;
    extension: string;
  };
}

interface Database {
  id: number;
  name: string;
}

interface ProjectsProviderProps {
  children: ReactNode;
}

interface ProjectsContextData {
  projects: Project[],
  createProject: (project: Project) => Promise<void>,
  deleteProject: (projectID: string) => Promise<void>,
  installProject: (project: Project) => Promise<void>,
}

const ProjectsContext = createContext<ProjectsContextData>(
  {} as ProjectsContextData
);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.get('project')
      .then(response => {console.log(response.data);setProjects(response.data)})
  }, [])

  async function createProject(projectInput: Project) {
    try {
      console.log(projectInput);
      const responseEnvironment = await api.post('environment', { 
        Name: `DEV-${projectInput.alias}`,
	      DataSource: projectInput.instance,
	      SQLUser: projectInput.sqlUser,
	      SQLPassword: projectInput.sqlPassword,
        DatabasePrefix: projectInput.alias
      });

      const environment : Environment = responseEnvironment.data;

      const response = await api.post('project', { 
        Name: projectInput.name,
	      Description: projectInput.description,
	      Alias: projectInput.alias,
	      Author: projectInput.author,
	      Customer: projectInput.customer,
	      StartProjectDate: new Date(),
	      BaselineProjectDate: new Date(),
	      TemplateID: projectInput.template,
	      EnvironmentID: environment.id,
	      VersionControlID: null,
	      VersionSettingID: projectInput.version
      });

      const project = response.data;
      setProjects([...projects, project]);
      enqueueSnackbar('Project created successfully!', { variant:'success', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    } catch (error) {
      enqueueSnackbar('Project not created!', { variant:'error', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    }
  }

  async function deleteProject(projectID: string) {
    const response = await api.delete(`project/${projectID}`);
    const { projects } = response.data;
    setProjects(projects);
  }

  function execShellCommand(cmd: string) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
     exec(cmd, (error, stdout, stderr) => {
      if (error) {
       console.warn(error);
      }
      resolve(stdout || stderr);
     });
    });
  }

  async function runningDBDeploy(filePath: string, projectAlias: string){
    console.log(`Running dbdeploy...`);
    await api.get(`dbdeployfile`)
          .then(response => {
            const buff = Buffer.from(response.data, "base64");
            fs.writeFile(`${filePath}\\scripts\\DBDeploy.ps1`, buff, (err) => {
              if (err) throw err;
            });
          })
    const command = `C:\\Windows\\syswow64\\windowspowershell\\v1.0\\powershell.exe  -ExecutionPolicy Unrestricted -file "${filePath}\\scripts\\DBDeploy.ps1" -ScriptsDirectory "${filePath}\\scripts" -ServerInstance "EBKNTBOOK-0909\\SQLEXPRESS" -DestinationDBPrefix "${projectAlias}_" -DBUsername "sa" -DBPassword "pass123456."`; 
    
    await execShellCommand(command);
  }

  async function installProjectFiles(filePath: string, projectInput: Project){
    let packages: Package [] = []
    await api.get('package')
    .then(response => {packages = response.data});
    
    if((os.platform() === 'darwin')){
      packages = packages.filter(p=>p.isMacOS)
    }else{
      packages = packages.filter(p=>!p.isMacOS)
    }

    for (const pack of packages) {
      // Get and Install packages
      console.log(`Downloading package ${pack.name}...`);
      await api.get(`package/${pack.name}/file`)
      .then(response => {
        const buff = Buffer.from(response.data, "base64");
        fs.writeFile(`${filePath}\\${pack.name}.zip`, buff, (err) => {
          if (err) throw err;
        });
      })
      console.log(`Extracting package ${pack.name}...`);
      await extract(`${filePath}\\${pack.name}.zip`, { dir: filePath })
      console.log(`Deleting file ${pack.name}...`);
      fs.unlinkSync(`${filePath}\\${pack.name}.zip`);

      // Get and Install Configuration files
      let packageFiles: PackageFile [] = []
      await api.get('packageFile', {
        headers: {
          'packageID': pack.id
        }
      })
      .then(response => {console.log(pack.id);console.log(response.data);packageFiles = response.data});
      for (const packFile of packageFiles) {
        console.log(`Downloading package File ${packFile.name}...`);
        await api.get(`packagefile/${packFile.fileType.name}/packagetemplate/${pack.templateName}/file`, {
          headers: {
            'projectName': projectInput.name,
            'projectAlias': projectInput.alias,
            'projectID': projectInput.id
          }
        })
        .then(response => {
          const buff = Buffer.from(response.data, "base64");
          fs.writeFile(`${filePath}\\${packFile.path}\\${packFile.name}.${packFile.fileType.extension}`, buff, (err) => {
            if (err) throw err;
          });
        })
      }
    }
  }

  async function installDatabases(filePath: string, projectInput: Project){
    let databases: Database [] = []
    await api.get('database')
    .then(response => {databases = response.data});

    for (const data of databases) {
      console.log(`Downloading database ${data.name}...`);
      await api.get(`database/${data.name}/file`)
      .then(response => {
        const buff = Buffer.from(response.data, "base64");
        fs.writeFile(`${filePath}\\${data.name}.zip`, buff, (err) => {
          if (err) throw err;
        });
      })
      console.log(`Extracting database ${data.name}...`);
      await extract(`${filePath}\\${data.name}.zip`, { dir: `${filePath}\\Scripts` })
      console.log(`Deleting file ${data.name}...`);
      fs.unlinkSync(`${filePath}\\${data.name}.zip`);
    };

    await runningDBDeploy(filePath, projectInput.alias);
    console.log('dbdeploy runned!');
  }

  async function installSites(filePath: string, projectInput: Project){
    let sites: Site [] = []
    await api.get('iissite')
    .then(response => {sites = response.data});

    for (const data of sites) {
      console.log(`Downloading sites ${data.name}...`);
      await api.get(`iissite/${data.id}/file`, {
        headers: {
          'projectPath': filePath,
          'projectAlias': projectInput.alias,
        }
      })
      .then(async(response) => {
        const buff = Buffer.from(response.data, "base64");
        fs.writeFile(`${filePath}\\${data.name}.ps1`, buff, (err) => {
          if (err) throw err;
        });

        const command = `C:\\Windows\\system32\\windowspowershell\\v1.0\\powershell.exe  -ExecutionPolicy Unrestricted -file "${filePath}\\${data.name}.ps1"`; 
        await execShellCommand(command);
        
        fs.unlinkSync(`${filePath}\\${data.name}.ps1`);
      })
    };
  }

  async function installProject(projectInput: Project){
    
    const { dialog } = require('electron').remote

    await dialog.showOpenDialog({ properties: ['openDirectory'] })
      .then(async response => {
        try {
          const projectPath = response.filePaths[0];
          const filePath = `${projectPath}\\eBankit.${projectInput.alias}\\Main\\Source`
          if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, {
              recursive: true
            });
          }

          // Get and Install Project Files
          await installProjectFiles(filePath, projectInput);

          if (os.platform() !== 'darwin') {
            // Get and Install Sites
            await installSites(projectPath, projectInput);

            // Get and Install Databases
            await installDatabases(filePath, projectInput);
          }

          const projecttoupdate = projectInput;
          projecttoupdate.isInstalledWindows = (os.platform() !== 'darwin');
          projecttoupdate.isInstalledMac = (os.platform() === 'darwin');

          await api.put(`project/${projectInput.id}`, {...projecttoupdate}).then(response => {
              api.get('project')
                .then(response => {console.log(response.data);setProjects(response.data)})
          });
          enqueueSnackbar('Project intalled successfully!', { variant:'success', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
        } catch (error) {
          enqueueSnackbar('Project not installed!', { variant:'error', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
        }
        
      }) 
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