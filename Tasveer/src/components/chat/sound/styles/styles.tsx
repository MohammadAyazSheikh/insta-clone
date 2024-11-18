import { createStyleSheet } from "react-native-unistyles";
import { widthToDp as w, heightToDp as h } from "../../../../utils/functions/responsiveUtils";
import { BUTTON_SIZE } from "../animatedRecorder";
import { THUMB_WIDTH } from "./portraitStyles";
const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing,fontSize } = theme;
    return ({
        btnRecorder: {
            width: w(BUTTON_SIZE),
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: colors.ternary1,
            marginLeft: spacing?.lg,
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
            padding:0,
            paddingHorizontal:0,
            paddingVertical:0,
            color: colors.secondary1,
            fontSize: fontSize?.sm,
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
            // minHeight: h(20),
            paddingVertical:spacing?.xxl,
            backgroundColor: colors.primary4,
            justifyContent: 'center',
            alignItems: 'center'
          },
          recorderCol: {
            width: '100%',
          },
        
          txtQuickTime: {
            color: colors.secondary1,
            fontSize: fontSize?.sm,
            marginLeft: spacing?.md,
            position:'static'
          },
          // ========================== sound player ==============
          playerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: "95%",
            height: 40,
            borderRadius: 10,
            paddingHorizontal: spacing?.md,
            backgroundColor: colors.primary3,
            justifyContent: 'center',
          },
          playerProgressView: {
            flex: 6,
            justifyContent: 'center',
            position: 'relative',
            height: 3,
            backgroundColor: colors.common?.grey1
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
            paddingHorizontal: spacing?.lg,
            marginTop: h(2),
          },
          btnController: {
            padding: spacing?.lg,
            borderRadius: 1000,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center'
          },
    })
});

export default styleSheet;