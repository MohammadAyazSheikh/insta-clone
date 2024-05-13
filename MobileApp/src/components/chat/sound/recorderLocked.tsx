import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Easing } from "react-native";
const { width } = Dimensions.get("window");
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import { TouchableRipple } from "react-native-paper";
import Slider from "./soundPlayer";
import { heightToDp, useAppThemeColors, useFunctionalOrientation, widthToDp } from "../../../utils/functions/responsiveUtils";
import responsiveStyles from "./styles/styles";
import { TextRegular } from "../../general/text/text";
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import SoundPlayer from "./soundPlayer";
//-160 - slowest sound
//0 - loudest sound
export const SOUND_BAR_GAP = 2;
export const SOUND_BAR_WIDTH = 3;
type props = {
  meteringList: number[],
  translateX: SharedValue<number>,
  time: string,
  isRecording: Boolean,
  onDelete: () => void,
  onSend: () => void,
  onPauseRecord: () => void,
}

const RecorderLocked = ({
  meteringList,
  translateX,
  time,
  isRecording,
  onDelete,
  onSend,
  onPauseRecord,
}: props) => {

  const { styles } = useFunctionalOrientation(responsiveStyles);
  const colors = useAppThemeColors();
  const rStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));




  //else if recording
  return (
    <View style={styles.recorderView}>
      <Animated.View style={styles.recorderContainer}
      // entering={FadeInDown}
      >
        {
          //recorder
          isRecording ?
            <View style={styles.recorderCol}>
              <View style={styles.barRootContainer}>
                <Animated.View style={[styles.barContainer,
                  rStyles
                ]}>
                  {
                    meteringList.
                      //  new Array(1).fill(0).
                      map((metering, index) => {

                        return (
                          <View
                            key={index}
                            style={[
                              styles.bar, {
                                //setting height of the bars according the loudness of the sound
                                height: `${interpolate(metering, [-15, -7.5, 0, 1], [10, 10, 40, 80], Extrapolation.CLAMP)}%`
                              }]}
                          />
                        );
                      })
                  }
                </Animated.View>
              </View>
              <TextRegular style={[styles.txtQuickTime]}>
                {time}
              </TextRegular>
            </View>
            :
            // player
            <SoundPlayer
              url="file:///Users/apple/Library/Developer/CoreSimulator/Devices/18AAA775-E3E8-4E9C-B3E5-74777B37CA73/data/Containers/Data/Application/FE6AAC40-38B7-42D6-A178-101E1413CF79/Library/Caches/sound.m4a"
            />
        }
        {/* recorder control view */}
        <View style={styles.recorderControlRow}>
          {/* delete */}
          <TouchableRipple style={styles.btnController}
            onPress={onDelete}
          >
            <IconMtc
              name={"delete"}
              size={25}
              color={"white"}
            />
          </TouchableRipple>
          {/* pause / recording */}
          <TouchableRipple style={[styles.btnController, { backgroundColor: 'tomato' }]}
            onPress={onPauseRecord}
          >
            <IconMtc
              name={isRecording ? "pause" : 'microphone'}
              size={25}
              color={"white"}
            />
          </TouchableRipple>
          {/* send */}
          <TouchableRipple
            style={[styles.btnController, { backgroundColor: colors.ternary1 }]}
            disabled={isRecording ? true : false}
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


