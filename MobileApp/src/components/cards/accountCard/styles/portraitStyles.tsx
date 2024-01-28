import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily, fontSize } from '../../../../theme/fonts';
import { radius } from '../../../../theme/spacing';

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
      paddingVertical: 5,
      paddingHorizontal:5,
    },
    body: {
      flex: 1,
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    topView: {
      width: '100%',
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom:5,
      paddingBottom:5,
      borderBottomWidth:1,
      borderStyle:'dashed',
      borderBottomColor:colors.secondary3
    },
    txtOrderNo: {
      color: colors.primary2,
      fontWeight: 'bold',
      fontFamily: fontFamily.bold,
      fontSize: w(fontSize.size8),
    },
    txtOrderTime:{
      color: colors.secondary4,
      fontFamily: fontFamily.regular,
      fontSize: w(fontSize.size7),
    },
    rowSpaceBetween:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    },
    txtTitle: {
      color: colors.ternary1,
      fontFamily: fontFamily.regular,
      fontSize: w(fontSize.size7),
    },
    txtValue: {
      color: colors.secondary4,
      fontFamily: fontFamily.regular,
      fontSize: w(fontSize.size7),
    },
    btnStyle:{
      width:"auto",
      height:40,
      paddingHorizontal:20,
      backgroundColor:colors.primary2,
      borderRadius:5
    },
    // buttons styles
    buttonsView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: 5,
    },
    btnView: {
      padding: 5,
      borderRadius: 100,
    },
  });
  
};

export default portraitStyles;
