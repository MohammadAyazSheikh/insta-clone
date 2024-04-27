
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
      width: w(BUTTON_SIZE),
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: colors.ternary1,
      marginLeft: 10,
    },
    iconLottie:{
      width: w(BUTTON_SIZE),
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
    },
    //lock icon
    iconLockContainer: {
      width: w(BUTTON_SIZE),
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: "tomato",
      position: 'absolute',
      bottom: 0,
      right: 0,
      overflow: 'hidden',
    },
    iconLock: {
      width: "100%",
      aspectRatio: 1,
      padding:3,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,

    },
    // quick recorder
    quickRecorderView: {
      // width: w(100)-20,
      height: w(BUTTON_SIZE),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      borderRadius: 100,
      backgroundColor: colors.primary4,
      position: 'absolute',
      bottom: 0,
      left: -w(100 - BUTTON_SIZE) + 20,
      overflow:'hidden',
      // transformOrigin: "left center"
    },
    // recorder
    recorderView: {
      width: w(100),
      height: h(100),
      backgroundColor: 'green',
      position: 'absolute',
      bottom: 0,
      left: 0,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    recorderContainer: {
      width: w(100),
      height: h(40),
      backgroundColor: 'red',
    },
  });
}

export default portraitStyles;



