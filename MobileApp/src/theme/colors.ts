export const darkColors = {
  primary1: '#000000',
  primary2: '#999999',
  primary3: '#363636',
  primary4: '#282828',

  secondary1: '#ffffff',


  ternary1: '#3797ef',
  ternary2: '#1b4b77',

  lightYellow: '#feda75',
  orange: '#fa7e1e',
  pink: '#d62976',
  purple: '#962fbf',
  blue: '#4f5bd5',
};

export const lightColors = {
  primary1: '#ffffff',
  primary2: '#999999',
  primary3: '#f5f5f5',
  primary4: '#EBEBEB',

  secondary1: '#000000',

  ternary1: '#3797ef',
  ternary2: '#9bcbf7',

  lightYellow: '#feda75',
  orange: '#fa7e1e',
  pink: '#d62976',
  purple: '#962fbf',
  blue: '#4f5bd5',
};

const colors = {

  ...lightColors,

  yellow1: '#FEBB1B',
  yellow2: '#EF9400',

  grey1: '#181a20',
  grey2: '#1f222a',
  grey3: '#35383f',
  grey4: 'grey',

  tomato: 'tomato',
  peach1: '#FF725E',
  peach2: '#ce6153',

  orange1: '#E06A29',
  white1: '#fff',
  black1: '#000',

  green1: '#3BB75C',

  red1: '#EC4E2C',

  blue1: '#006DE5',
  blue2: '#069bcf',
};
export type colorObjectType = typeof colors & typeof lightColors & typeof darkColors;
export default colors;
