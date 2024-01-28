import {StyleSheet} from 'react-native';
import {colorObjectType} from '../../../../theme/colors';
import {fontFamily, fontSize} from '../../../../theme/fonts';
import {radius} from '../../../../theme/spacing';


type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
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
      overflow: 'hidden',
    },
    // top styles
    topView: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 5,
    },
    imageInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100%',
      flex:1,
    },
    imageView: {
      width: w(18),
      aspectRatio: 1,
      // backgroundColor: colors.primary4,
      borderRadius: 5,
    },
    imgStyle: {
      width: '100%',
      height: '100%',
      borderRadius: 5,
    },
    imageTextView: {
      justifyContent: 'flex-start',
      height: '100%',
      paddingLeft: 5,
      flex:1,
    },
    // quantity row
    qtyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    inputContainer: {
      width: w(15),
    },
    inputStyle: {
      width: '100%',
      height: 45,
      borderColor: colors.secondary2,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: colors.primary1,
    },
    //   content view
    content: {
      flex: 1,
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 5,
    },
    txtTitleView: {
      width: '100%',
    },
    txtTitle: {
      color: colors.ternary1,
      fontWeight: 'bold',
      fontFamily: fontFamily.bold,
      fontSize: w(fontSize.size8),
    },
    txtDesc: {
      color: colors.ternary1,
      fontFamily: fontFamily.bold,
      fontSize: w(fontSize.size6),
    },
   
    row: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      paddingTop: 3,
    },
    btnFav: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: colors.secondary2,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
    },
  });
};

export default portraitStyles;
