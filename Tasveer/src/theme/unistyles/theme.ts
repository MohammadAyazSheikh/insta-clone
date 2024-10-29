// import { commonColors, darkColors, lightColors } from "../colors"

const spacing = {
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12
};

const fontSize = {
  xsm:10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xl2:20,
  xl3:22,
  xl4:24,
  xl6:26,
}
const commonColors = {
  lightYellow: '#feda75',
  yellow: '#fccc63',
  orange: '#fa7e1e',
  pink: '#d62976',
  purple: '#962fbf',
  blue: '#4f5bd5',

  grey1: '#999999',
}

export const darkColors = {
  primary1: '#000000',
  primary3: '#363636',
  primary4: '#282828',

  secondary1: '#ffffff',


  ternary1: '#3797ef',
  ternary2: '#1b4b77',
  ternary3: '#B1BEC8',
};

export const lightColors = {
  primary1: '#ffffff',
  primary3: '#f5f5f5',
  primary4: '#EBEBEB',

  secondary1: '#000000',

  ternary1: '#3797ef',
  ternary2: '#9bcbf7',
  ternary3: '#063F6E',
};

export const lightTheme = {
  colors: {
    ...lightColors,
    common:commonColors
  },
  spacing,
  fontSize
} as const

export const darkTheme = {
  colors: {
    ...darkColors,
    common:commonColors
  },
  spacing,
  fontSize
} as const
