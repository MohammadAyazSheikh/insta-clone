
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { getShadow } from '../../../../theme/platformSpecificStyles';
import { BUTTON_SIZE } from '../animatedRecorder';
import { SOUND_BAR_GAP, SOUND_BAR_WIDTH } from '../recorderLocked';

type p = (number: number) => number;
export const THUMB_WIDTH = 20;
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
    iconLottie: {
      width: w(BUTTON_SIZE),
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
    },
    //======================== lock icon ================
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
      padding: 3,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,

    },
    // ============================== quick recorder =================
    quickRecorderView: {
      // width: w(100)-20,
      height: w(BUTTON_SIZE),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: colors.primary4,
      position: 'absolute',
      bottom: 0,
      left: -w(100 - BUTTON_SIZE) + 20,
      overflow: 'hidden',
      // transformOrigin: "left center"
    },
    txtTime: {
      color: colors.secondary1,
      fontSize: 12,
      position: 'absolute',
      left: 0
    },
    // ================================= locked recorder ================
    recorderView: {
      width: w(100),
      height: h(100),
      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'absolute',
      bottom: 0,
      left: 0,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    recorderContainer: {
      width: w(100),
      height: h(20),
      backgroundColor: colors.primary4,
      justifyContent: 'center',
      alignItems: 'center'
    },
    recorderCol: {
      width: '100%',
    },
    barRootContainer: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
      backgroundColor: colors.primary3,
    },
    barContainer: {
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      // gap:  SOUND_BAR_GAP,
      // backgroundColor: colors.ternary1,
      position: 'absolute',
    },
    bar: {
      height: '100%',
      width: SOUND_BAR_WIDTH,
      backgroundColor: colors.ternary1,
      borderRadius: 3,
      marginRight: SOUND_BAR_GAP
    },
    txtQuickTime: {
      color: colors.secondary1,
      fontSize: 12,
      marginLeft: 5,
    },
    // ========================== sound player ==============
    playerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: "95%",
      height: 40,
      borderRadius: 10,
      paddingHorizontal: 5,
      backgroundColor: colors.primary3,
      justifyContent: 'center',
    },
    playerProgressView: {
      flex: 6,
      justifyContent: 'center',
      position: 'relative',
      height: 3,
      backgroundColor: colors.grey1
    },
    thumb: {
      width: THUMB_WIDTH,
      aspectRatio: 1,
      borderRadius: 10,
      backgroundColor: 'white',
      position: 'absolute',
    },
    //----- controls styles -----
    recorderControlRow: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginTop: h(2)
    },
    btnController: {
      padding: 10,
      borderRadius: 1000,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });
}

export default portraitStyles;



