import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as fs from 'fs';
import { useSnackbar } from 'notistack';

import { api } from "../services/api";

interface Application {
  id: string;
  name?: string;
}

interface Menu {
  id: string;
  name: string;
  application: Application;
  createdAt: Date;
}

type MenuInput = Omit<Menu, 'id' | 'createdAt'>;

interface MenusProviderProps {
  children: ReactNode;
}

interface MenusContextData {
  menus: Menu[],
  createMenu: (menu: MenuInput) => Promise<void>,
  deleteMenu: (menuID: string) => Promise<void>,
  exportMenu: (menuID: string) => Promise<void>
}

const MenusContext = createContext<MenusContextData>(
  {} as MenusContextData
);

export function MenusProvider({ children }: MenusProviderProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    api.get('menu')
       .then(response => {setMenus(response.data)})
  }, []);
  
  async function createMenu(menuInput: MenuInput) {
    try {
      console.log({ name: menuInput.name, applicationID: menuInput.application.id, projectID: 'cc54ba38-46ec-4970-be2c-00276a318f1a' });
      const response = await api.post('menu', { name: menuInput.name, applicationID: menuInput.application.id, projectID: 'cc54ba38-46ec-4970-be2c-00276a318f1a' });
      const menu = response.data;
      setMenus([...menus, menu]);
      enqueueSnackbar('Menu created successfully!', { variant:'success', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    } catch (error) {
      enqueueSnackbar('Menu not created!', { variant:'error', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    }
    
  }

  async function deleteMenu(menuID: string) {
    try {
      await api.delete(`menu/${menuID}`);
      await api.get('menu')
      .then(response => setMenus(response.data));
      enqueueSnackbar('Menu deleted successfully!', { variant:'success', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    } catch (error) {
      enqueueSnackbar('Menu not deleted!', { variant:'error', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    }
    
  }

  async function exportMenu(menuID: string) {
    const { dialog } = require('electron').remote
    try {
      await dialog.showOpenDialog({ properties: ['openDirectory'] })
      .then(async response => {
        const projectPath = response.filePaths[0];
        await api.get(`menu/${menuID}/exportfile`)
          .then(response => {
            fs.writeFile(`${projectPath}//menu.json`, Buffer.from(response.data, "base64").toString(), (err) => {
              if (err) throw err;
            });
          })
      })
      enqueueSnackbar('Menu exported successfully!', { variant:'success', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    } catch (error) {
      enqueueSnackbar('Menu not exported!', { variant:'error', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    }
  }

  return (
    <MenusContext.Provider value={{ menus, createMenu, deleteMenu, exportMenu }}>
      {children}
    </MenusContext.Provider>
  )
}

export function useMenus() {
  const context = useContext(MenusContext);

  return context;
}