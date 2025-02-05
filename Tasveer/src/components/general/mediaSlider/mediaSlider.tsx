import React, { useCallback, useRef } from 'react';
import {
  View,
  Image,
  ViewStyle,
  ImageStyle,
  FlatList,
} from 'react-native';
import { SliderIndicator } from './sliderIndicator';
import ZoomAbleView from '../../animatedComponent/zoomableView';
import VideoPlayerContent from '../video/videoPlayerContent';
import HeartAnimation from '../../animatedComponent/heartAnimation';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

export type imageListType =
  { id: string, uri: any | { uri: string }, type: "image" | 'video' }

type mediaType = {
  autoSlide?: boolean;
  mediaList: imageListType[];
  indicatorType?: 'image' | 'dot';
  containerStyle?: ViewStyle;
  mediaContainer?: ViewStyle;
  imageStyle?: ImageStyle;
  //indicatorPops
  indicatorRowContainerStyle?: ViewStyle;
  indicatorColor?: string;
  indicatorRadius?: number;
  indicatorSize?: number;
  indicatorSpacing?: number;
  indicatorContainerWidth?: number;
  scrollIndex?: number | null;
  indicatorLeftIcon?: React.ComponentType;
  indicatorRightIcon?: React.ComponentType;
  onDoubleTab?: () => void,
};
export const MediaSlider = React.memo(({
  autoSlide = false,
  mediaList = [],
  indicatorType = 'dot',
  containerStyle,
  mediaContainer,
  imageStyle,
  scrollIndex = 0,
  //indicator props
  indicatorColor = 'tomato',
  indicatorRadius = 100,
  indicatorSize = 30,
  indicatorSpacing = 7,
  indicatorContainerWidth = (indicatorSize + indicatorSpacing) * 4,
  indicatorRowContainerStyle,
  indicatorLeftIcon: IndLeftIcon,
  indicatorRightIcon: IndRightIcon,
  //for double tab
  onDoubleTab
}: mediaType) => {


  const { styles } = useStyles(styleSheet);

  const scrollRef = useRef<FlatList>(null);

  // Shared value to track the scroll offset
  const scrollX = useSharedValue(0);

  // Scroll handler to update the shared value
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });


  // useEffect(() => {
  //   //if user pass scroll index
  //   scrollIndex &&
  //     scrollRef?.current?.scrollTo({
  //       x: w(100) * scrollIndex,
  //       y: 0,
  //       animated: true,
  //     });
  //   //for auto sliding
  //   const startAnim = () => {
  //     let index = 0;
  //     return setInterval(() => {
  //       scrollRef?.current?.scrollTo({ x: w(100) * index, y: 0, animated: true });
  //       index++;
  //       if (index == mediaList.length) {
  //         index = 0;
  //       }
  //     }, 1500);
  //   };
  //   const id = autoSlide ? startAnim() : 0;
  //   return () => {
  //     autoSlide ? clearInterval(id) : null;
  //   };
  // }, []);


  //function to render media item
  const renderItem = useCallback(({ item }: { item: imageListType }) => (
    <ZoomAbleView
      containerStyle={{ ...styles.mediaView, ...mediaContainer }}
    >
      {
        item.type === "video" ?
          <VideoPlayerContent
            source={typeof item.uri === "string" ? { uri: item.uri } : item.uri}
            style={[styles.videoStyle]}
          />
          :
          <Image
            source={typeof item.uri === "string" ? { uri: item.uri } : item.uri}
            style={[styles.sliderImage, imageStyle]}
          />
      }
      {/* heart animation */}
      <HeartAnimation onDoubleTab={onDoubleTab} />
    </ZoomAbleView>
  ), [])

  return (
    <View style={[styles.sliderContainer, containerStyle]}>
      <Animated.FlatList
        horizontal
        pagingEnabled
        ref={scrollRef}
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        data={mediaList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      {/*  -------- indicator ------*/}
      <View style={[styles.row, indicatorRowContainerStyle]}>
        {
          // left icon
          IndLeftIcon ? <IndLeftIcon /> : null
        }
        <View>
          {
            mediaList.length > 1 ?
              <SliderIndicator
                color={indicatorColor}
                radius={indicatorRadius}
                size={indicatorSize}
                spacing={indicatorSpacing}
                containerWidth={indicatorContainerWidth}
                length={mediaList.length}
                imageList={indicatorType == 'image' ? mediaList : []}
                scrollX={scrollX}
                scrollRef={scrollRef}
              />
              :
              null
          }
        </View>
        {
          // right icon
          IndRightIcon ? <IndRightIcon /> : null
        }
      </View >
    </View>
  );
});

