import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  Image,
  ScrollView,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { SliderIndicator } from './sliderIndicator';
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import ZoomAbleView from '../../animatedComponent/zoomableView';
import VideoPlayerContent from '../video/videoPlayerContent';

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
};

const remoteVideo = { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
export const MediaSlider = ({
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
}: mediaType) => {


  const { styles, widthToDp: w, heightToDp: h } = useFunctionalOrientation(responsiveStyles);

  const scrollX = useRef(new Animated.Value(1)).current;
  const scrollRef = useRef<ScrollView>(null);

  //hold value if visible in screen or not
  const [isOnScreen, setIsOnScreen] = useState(false);

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
        if (index == mediaList.length) {
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
      {/* ----- media list ------ */}
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
        {mediaList.map((item, index) => (
          <ZoomAbleView
            containerStyle={{ ...styles.mediaView, ...mediaContainer }}
            key={item.id}
          >
            {
              item.type == "video" ?
                <VideoPlayerContent
                  source={item.uri}
                  style={[styles.videoStyle]}
                  resizeMode='contain'
                />
                :
                <Image
                  source={item.uri}
                  style={[styles.sliderImage, imageStyle]}

                />
            }
          </ZoomAbleView>
        ))}
      </Animated.ScrollView>
      {/*  -------- indicator ------*/}
      {mediaList.length > 1 ? (
        <View style={[styles.row, indicatorRowContainerStyle]}>
          {
            // left icon
            IndLeftIcon ? <IndLeftIcon /> : null
          }
          <View>
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
          </View>
          {
            // right icon
            IndRightIcon ? <IndRightIcon /> : null
          }
        </View >
      ) : null}
    </View>
  );
};
