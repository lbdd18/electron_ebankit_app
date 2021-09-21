import { FiHome, FiUsers, FiFigma, FiFolder, FiFile, FiLayers, FiSettings, FiDatabase} from "react-icons/fi";


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FiHome />
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: <FiFolder />
  },
  {
    title: 'Menus',
    path: '/menus',
    icon: <FiLayers />
  },
  {
    title: 'Users',
    path: '/users',
    icon: <FiUsers />
  },
  {
    title: 'Transactions',
    path: '/transactions',
    icon: <FiFile />
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <FiSettings />
  },
  {
    title: 'Admin Panel',
    path: '/adminpanel',
    icon: <FiDatabase />
  },
  {
    title: 'Toolkit',
    path: '/toolkit',
    icon: <FiFigma />
  }
]