import React, { useEffect, useRef } from 'react';
import {
  Animated,
  View,
  Image,
  ScrollView,
  ViewStyle,
  ImageStyle,
} from 'react-native';

import { SliderIndicator } from './sliderIndicator';
import uuid from 'react-native-uuid';
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import { Image as ImageType } from 'react-native-image-crop-picker';

export type imageListType =
  { id: string, uri: any | { uri: string }, type: "uri" | 'video' }

type sliderType = {
  autoSlide?: boolean;
  imageList: imageListType[];
  indicatorType?: 'image' | 'dot';
  containerStyle?: ViewStyle;
  imageContainerStyle?: ViewStyle;
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

export const Slider = ({
  autoSlide = false,
  imageList = [],
  indicatorType = 'dot',
  containerStyle,
  imageContainerStyle,
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
}: sliderType) => {


  const { styles, widthToDp: w } = useFunctionalOrientation(responsiveStyles);

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
        if (index == imageList.length) {
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
      {/* ----- images ------ */}
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
        {imageList.map((item, index) => (
          <View
            style={[styles.sliderImageView, imageContainerStyle]}
            key={item.id}>
            <Image
              source={item.uri}
              style={[styles.sliderImage, imageStyle]}
            />
          </View>
        ))}
      </Animated.ScrollView>
      {/*  -------- indicator ------*/}
      {imageList.length > 1 ? (
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
              length={imageList.length}
              imageList={indicatorType == 'image' ? imageList : []}
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
