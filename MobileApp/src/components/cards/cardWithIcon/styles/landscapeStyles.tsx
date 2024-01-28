import {StyleSheet} from 'react-native';
import {colorObjectType} from '../../../../theme/colors';
import {fontFamily, fontSize} from '../../../../theme/fonts';
import {radius} from '../../../../theme/spacing';


type p = (number: number) => number;

const landscapStyles = (w: p, h: p, colors: colorObjectType) => {
  return StyleSheet.create({
    cardView: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.secondary2,
      width: w(95),
      height: 'auto',
      borderRadius: radius.radius1,
      marginVertical: 10,
      paddingVertical: 20,
  
    },
    
    imageView: {
      width: h(18),
      aspectRatio: 1,
      borderRadius: 5,
    },
    imgStyle: {
      width: '100%',
      height: '100%',
      borderRadius: 5,
    },
   
    txtTitle: {
      color: colors.ternary1,
      fontWeight: 'bold',
      fontFamily: fontFamily.bold,
      fontSize: h(fontSize.size8),
      marginTop:10,
    },
   
  });
};

export default landscapStyles;
