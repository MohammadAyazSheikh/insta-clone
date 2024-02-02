export const commonColors = {
  lightYellow: '#feda75',
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

  ...commonColors,
};

export const lightColors = {
  primary1: '#ffffff',
  primary3: '#f5f5f5',
  primary4: '#EBEBEB',

  secondary1: '#000000',

  ternary1: '#3797ef',
  ternary2: '#9bcbf7',

  ...commonColors
};

const colors = {

  ...lightColors,
  ...commonColors

};
export type colorObjectType = typeof colors & typeof lightColors & typeof darkColors;
export default colors;
