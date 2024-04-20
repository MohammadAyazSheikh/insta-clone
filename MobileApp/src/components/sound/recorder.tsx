import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Easing } from "react-native";
const { width } = Dimensions.get("screen");
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import useSoundRecorderHooks from "./hooks/soundRecorderhooks";
import { TouchableRipple } from "react-native-paper";
import { RecordBackType } from "react-native-audio-recorder-player";
import Slider from "./player";

//-160 - slowest sound
//0 - loudest sound

const Recorder = () => {

  const [data, setData] = useState<number[]>([]);

  const { onStartRecord, onStopRecord ,onStartPlay,onPausePlay} = useSoundRecorderHooks();

  // animated value to move wave towards right side
  const translate = useSharedValue(width);

  const rStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.value }],
  }));



  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Animated.View style={[styles.barContainer, rStyles]}>
          {
            data.map((metering, index) => {

              return (
                <View
                  key={index}
                  style={[
                    styles.bar, {
                      //setting height of the bars according the loudness of the sound
                      height: interpolate(metering, [-50, -40, -20, 0], [2, 2, 40, 80], Extrapolation.CLAMP)
                    }]}
                />
              );
            })
          }
        </Animated.View>
      </View>

      {/* record */}
      <TouchableRipple
        onPress={() => {
          onStartRecord((e) => {
            // if (data.length > 10) {
            //   console.log("--------------")
            //   setData([e.currentMetering || 0])
            // }
            // else { 
            //   setData(prev => [...prev, e.currentMetering || 0])
            // }
            setData(prev => [...prev, e.currentMetering || 0])
            translate.value = withTiming(translate.value - 2, { duration: 100 })
          })
        }}
      >
        <Text>
          Record
        </Text>
      </TouchableRipple>
      {/* play */}
      <TouchableRipple
        onPress={() => {
          onStopRecord(() => {
            translate.value = width;
            setData([]);
          })
        }}
      >
        <Text>
          Stop
        </Text>
      </TouchableRipple>




    </View>
  )

}

export default Recorder;


const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  barContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'grey',
    position: 'absolute',
  },
  bar: {
    height: '100%',
    width: 3,
    backgroundColor: 'black',
    borderRadius: 3,
  }
})