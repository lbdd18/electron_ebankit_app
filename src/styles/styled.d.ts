import 'styled-components'
import { lightTheme } from './Themes'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof lightTheme.colors
  }
}