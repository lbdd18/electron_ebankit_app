import { createContext, ReactNode, useContext, useState } from "react";
import { StylesProvider, createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { ThemeProvider } from 'styled-components';

interface ThemesProviderProps {
  children: ReactNode;
}


interface ThemesContextData {
  myTheme: Theme,
  changeTheme: () => Promise<void>
}

const ThemesContext = createContext<ThemesContextData>(
  {} as ThemesContextData
);

export function ThemesProvider({ children }: ThemesProviderProps) {
  const [toggleDark, settoggleDark] = useState(false);

  const myTheme = createTheme({
    palette:{
      secondary: teal,
      type: toggleDark ? 'dark' : 'light',
    }
  })

  async function changeTheme() {
    settoggleDark(!toggleDark);
  }

  return (
    <ThemesContext.Provider value={{ myTheme, changeTheme }}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={myTheme}>
          <ThemeProvider theme={myTheme}>
            {children}
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </ThemesContext.Provider>
  )
}

export function useThemes() {
  const context = useContext(ThemesContext);

  return context;
}