
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily, fontSize } from '../../../../theme/fonts';
import { getShadow } from '../../../../theme/platformSpecificStyles';
import { radius ,spacing} from '../../../../theme/spacing';

type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

  return StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: colors.secondary2,
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '95%',
      height: 'auto',
      borderRadius: 10,
      overflow: 'hidden',
    },
    backDrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'black',
      opacity: 0.8,
    },
    body: {
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 20,
      paddingHorizontal: 10,
    },
    row: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',

    },

    //input style
    inputContainer: {
      width: '47%',
    },
    inputStyle: {
      width: '100%',
      height: 45,
      borderColor: colors.primary5,
      borderWidth: 1,
      borderRadius: 5,
    },

    //edit button
    btnView: {
      padding: 5,
      borderRadius: 100,
      position: "absolute",
      backgroundColor: colors.secondary3,
      right: 10,
      top: 10
    },
    // picker
    pickerViewStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.secondary2,
      width: w(40),
      height: 45,
      borderRadius: radius.radius1,
      paddingHorizontal: spacing.spacing1,
      overflow: 'hidden',
      marginVertical: 10,
      borderWidth: 1,
      borderColor: colors.primary2
    },
    pickerContainerStyle: {
      width: '100%',
      height: '100%'
    },
    pickerItemStyle: {
      color: colors.primary1,
      fontFamily: fontFamily.regular,
      fontSize: h(fontSize.size7),
      backgroundColor: colors.secondary2,
    },
    txtErr: {
      color: colors.tomato,
      fontFamily: fontFamily.regular,
      fontSize: h(fontSize.size7)
    },
    txtLabel: {
      color: colors.ternary1,
      fontFamily: fontFamily.regular,
      fontSize: h(fontSize.size7)
    },
    // button style
    btnSubmitStyles: {
      width: '100%',
      backgroundColor: colors.primary4
    },
    dueView: {
      borderWidth: 2,
      borderColor: colors.primary1
    }
  });
}

export default landscapeStyles;



