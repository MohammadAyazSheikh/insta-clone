
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../theme/colors';
import { getShadow } from '../../../theme/platformSpecificStyles';
import { BUTTON_SIZE } from '../animatedRecorder';

type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

  return StyleSheet.create({
    container: {

    },
    btnRecorder: {
      width:w(BUTTON_SIZE),
      aspectRatio:1,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 100,
      backgroundColor: colors.ternary1,
      marginLeft: 10,
    },
    iconLockContainer:{
      width:w(BUTTON_SIZE),
      justifyContent:'flex-start',
      alignItems:'center',
      borderRadius: 100,
      backgroundColor: "tomato",
      position:'absolute',
      bottom:0,
      right:0,
    },
    iconLock: {
      width:"100%",
      aspectRatio:1,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 100,
      backgroundColor: "tomato",
    },
    // recorder
    recorderView:{
      width:w(100),
      height:h(100),
      backgroundColor:'green',
      position:'absolute',
      bottom:0,
      left:0,
      justifyContent:'flex-end',
      alignItems:'center'
    },
    recorderContainer:{
      width:w(100),
      height:h(40),
      backgroundColor:'red',
    },
  });
}

export default portraitStyles;



