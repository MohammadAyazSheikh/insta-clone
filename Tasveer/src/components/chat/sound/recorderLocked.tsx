import React from "react";
import { View, Platform } from "react-native";
import Animated, {
  interpolate,
  Extrapolation,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { TouchableRipple } from "react-native-paper";
import { widthToDp } from "../../../utils/functions/responsiveUtils";
import styleSheet from "./styles/styles";
import IconMtc from '@expo/vector-icons/MaterialCommunityIcons';
import SoundPlayer from "./soundPlayer";
import { RecordTime } from "./recorderQuick";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const inputRange = Platform.select({
  ios: [-10, -5, 0],
  android: [-20, -10, 0]
})


//-160 - slowest sound
//0 - loudest sound
export const SOUND_BAR_GAP = 5;
export const SOUND_BAR_WIDTH = 10;
export const TOTAL_BAR_WIDTH = SOUND_BAR_WIDTH + SOUND_BAR_GAP;
export const BAR_CONTAINER_WIDTH = widthToDp(100);
type props = {
  animPastBarsWidth: SharedValue<number>,
  meteringList: { metering: number, isPastBar?: boolean }[],
  translateX: SharedValue<number>,
  recordTimeSharedVal: SharedValue<number>
  isRecording: Boolean,
  onDelete: () => void,
  onSend: () => void,
  onPauseRecord: () => void,
  uri?: string,
}

const RecorderLocked = ({
  meteringList,
  translateX,
  animPastBarsWidth,
  recordTimeSharedVal,
  isRecording,
  uri,
  onDelete,
  onSend,
  onPauseRecord,
}: props) => {

  const { styles, theme: { colors } } = useStyles(styleSheet);
  const { styles: stylesBars } = useStyles(barStyleSheet);

  const stylesAnimBarContainer = useAnimatedStyle(() => ({
    transform: [{ translateX: -translateX.value }],
  }), [translateX]);

  const styles1stBar = useAnimatedStyle(() => ({
    width: animPastBarsWidth.value
  }), [animPastBarsWidth]);




  return (
    <View style={styles.recorderView}>
      <Animated.View style={styles.recorderContainer}
      // entering={FadeInDown}
      >
        {
          //recorder
          isRecording ?
            <View style={styles.recorderCol}>
              <View style={stylesBars.recorderContainer}>
                <View style={stylesBars.recorderBody}>
                  <Animated.View style={[stylesBars.barContainer, stylesAnimBarContainer]}>
                    {
                      meteringList.map((b, index) => {
                        const height = interpolate(b.metering, inputRange!, [SOUND_BAR_WIDTH, 15, 35], Extrapolation.CLAMP)
                        return (
                          <Animated.View
                            // entering={StretchInY.duration(200).delay(50)}
                            key={index}
                            style={[
                              stylesBars.bar,
                              { height: height },
                              b?.isPastBar ? styles1stBar : {}
                            ]}
                          />)
                      })
                    }
                  </Animated.View>
                </View>
              </View>
              {/* recording time */}
              <RecordTime recordTimeSharedVal={recordTimeSharedVal} styles={styles.txtQuickTime} />
            </View>
            :
            // player
            <SoundPlayer
              iconColor={colors.ternary2}
              thumbStyles={{backgroundColor:colors.ternary2}}
              url={uri!}
            />
        }
        {/* recorder control view */}
        <View style={styles.recorderControlRow}>
          {/* --- delete --- */}
          <TouchableRipple style={styles.btnController}
            onPress={onDelete}
          >
            <IconMtc
              name={"delete"}
              size={25}
              color={"white"}
            />
          </TouchableRipple>
          {/* --- pause / recording  --- */}
          <TouchableRipple style={[styles.btnController, { backgroundColor: 'tomato' }]}
            onPress={onPauseRecord}
          >
            <IconMtc
              name={isRecording ? "pause" : 'microphone'}
              size={25}
              color={"white"}
            />
          </TouchableRipple>
          {/* ---- send button --- */}
          <TouchableRipple
            style={[styles.btnController, { backgroundColor: colors.ternary1 }]}
            // disabled={!!!isRecording}
            onPress={onSend}
          >
            <IconMtc
              name={"send"}
              size={25}
              color={"white"}
            />
          </TouchableRipple>
        </View>
      </Animated.View>
    </View>
  )

}

export default RecorderLocked;


const barStyleSheet = createStyleSheet((theme) => {
  const { colors } = theme;
  return ({
    recorderContainer: {
      alignSelf: "center",
      width: BAR_CONTAINER_WIDTH - TOTAL_BAR_WIDTH * 2,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    recorderBody: {
      width: BAR_CONTAINER_WIDTH,
      height: 100,
      alignItems: "flex-start",
      borderRadius: 5,
      position: 'absolute',
      right: 0,
      top: 0
    },
    barContainer: {
      height: "100%",
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      // gap: SPACE_WIDTH
    },
    bar: {
      height: "100%",
      width: SOUND_BAR_WIDTH,
      marginRight: SOUND_BAR_GAP,
      backgroundColor: colors?.secondary1,
      borderRadius: SOUND_BAR_WIDTH,
    },
  })
})






