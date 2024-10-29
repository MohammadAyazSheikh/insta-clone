import { commonColors, darkColors, lightColors } from "../colors"

export const lightTheme = {
    colors: {
      ...lightColors,
      ...commonColors
    },
    spacing: {
      sm: 2,
      md: 4,
      lg: 8,
      xl: 12
    }
  } as const
 
  export const darkTheme = {
    colors: {
      ...darkColors,
      ...commonColors
    },
    spacing: {
      sm: 2,
      md: 4,
      lg: 8,
      xl: 12
    }
  } as const
 