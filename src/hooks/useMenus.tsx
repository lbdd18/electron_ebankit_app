import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as fs from 'fs';

import { api } from "../services/api";

interface Menu {
  id: number;
  name: string;
  application: string;
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
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    api.get('menus')
      .then(response => setMenus(response.data.menus))
  }, [])

  async function createMenu(menuInput: MenuInput) {
    const response = await api.post('menus', { ...menuInput, createdAt: new Date() });
    const { menu } = response.data;
    setMenus([...menus, menu])
  }

  async function deleteMenu(menuID: string) {
    const response = await api.delete(`menus/${menuID}`);
    const { menus } = response.data;
    setMenus(menus);
  }

  async function exportMenu(menuID: string) {
    fs.writeFile(`c://temp//menu-${menuID}.txt`, menuID, (err) => {
      if (err) throw err;
      console.log('Menu saved!');
    });
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