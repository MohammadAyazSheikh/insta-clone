import React, { useEffect, useRef } from 'react';
import {
  Animated,
  View,
  ScrollView,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { SliderIndicator } from './sliderIndicator';
import uuid from 'react-native-uuid';
import styleSheet from './styles/styles';
import VideoPlayerContent from '../video/videoPlayerContent';
import { useStyles } from 'react-native-unistyles';
import { widthToDp as w } from '../../../utils/functions/responsiveUtils';

type sliderType = {
  autoSlide?: boolean;
  videoList: string[];
  indicatorType?: 'image' | 'dot';
  containerStyle?: ViewStyle;
  videoContainerStyle?: ViewStyle;
  videoStyles?: ImageStyle;
  //indicatorPops
  indicatorColor?: string;
  indicatorRadius?: number;
  indicatorSize?: number;
  indicatorSpacing?: number;
  indicatorContainerWidth?: number;
  scrollIndex?: number | null;
};

export const VideoPlyer = ({
  autoSlide = false,
  videoList = [],
  indicatorType = 'dot',
  containerStyle,
  videoContainerStyle,
  videoStyles,
  scrollIndex,
  //indicator props
  indicatorColor = 'tomato',
  indicatorRadius = 10,
  indicatorSize = 30,
  indicatorSpacing = 7,
  indicatorContainerWidth = (indicatorSize + indicatorSpacing) * 4,
}: sliderType) => {


  const { styles } = useStyles(styleSheet);

  const scrollX = useRef(new Animated.Value(1)).current;
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    //if user pass scroll index
    scrollIndex &&
      scrollRef?.current?.scrollTo({
        x: w(100) * scrollIndex,
        y: 0,
        animated: true,
      });
    //for auto sliding
    const startAnim = () => {
      let index = 0;
      return setInterval(() => {
        scrollRef?.current?.scrollTo({ x: w(100) * index, y: 0, animated: true });
        index++;
        if (index == videoList.length) {
          index = 0;
        }
      }, 1500);
    };
    const id = autoSlide ? startAnim() : 0;
    return () => {
      autoSlide ? clearInterval(id) : null;
    };
  }, []);

  return (
    <View style={[styles.sliderContainer, containerStyle]}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}>
        {videoList.map((item, index) => (
          <View
            style={[styles.slideVideoView, videoContainerStyle]}
            key={String(item + index)}>
            <VideoPlayerContent
              source={item}
              style={[styles.videoStyles, videoStyles!]}
            />
          </View>
        ))}
      </Animated.ScrollView>
      {videoList.length > 1 ? (
        <SliderIndicator
          color={indicatorColor}
          radius={indicatorRadius}
          size={indicatorSize}
          spacing={indicatorSpacing}
          containerWidth={indicatorContainerWidth}
          length={videoList.length}
          // imageList={indicatorType == 'image' ? videoList : []}
          scrollX={scrollX}
          scrollRef={scrollRef}
        />
      ) : null}
    </View>
  );
};
