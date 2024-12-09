import React, { useRef, useCallback } from 'react';
import { Image, TouchableOpacity, FlatList } from 'react-native';
import { imageListType } from './mediaSlider';
import Animated, { Extrapolation, interpolate, runOnJS, SharedValue, useAnimatedStyle, useDerivedValue, } from 'react-native-reanimated';
import { widthToDp as w } from '../../../utils/functions/responsiveUtils';
const width = w(100);

type IndicatorPropType = {
  scrollX: SharedValue<number>;
  length?: number;
  size?: number;
  color?: string;
  radius?: number;
  spacing?: number;
  containerWidth?: number;
  imageList?: imageListType[];
  scrollRef?: React.RefObject<FlatList>;
};

export const SliderIndicator = ({
  scrollX,
  length = 3,
  size = 30,
  color = 'red',
  radius = 1000,
  spacing = 7,
  imageList = [],
  scrollRef,
  containerWidth = (size + spacing) * 100,
}: IndicatorPropType) => {


  const data = imageList.length > 0 ? imageList : new Array(length).fill(1);
  const indicatorScrollRef = useRef<FlatList>(null);

  //scrolling indicating scroll view a/c to position of image scroll value
  const calOffset = () => {
    const val = w(100) / (size + spacing);
    indicatorScrollRef.current?.scrollToOffset({
      offset: scrollX.value / val,
      animated: true,
    });
  }

  useDerivedValue(() => {
    runOnJS(calOffset)();
  }, [scrollX])


  //function to render circles
  const renderItems = useCallback((
    { item, index }:
      { item: imageListType, index: number }) => {
    return (
      <Circle
        scrollRef={scrollRef}
        scrollX={scrollX}
        color={color}
        size={size}
        spacing={spacing}
        radius={radius}
        index={index}
        item={item}
      />
    )
  }, []);
  
  return (

    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      ref={indicatorScrollRef}
      contentContainerStyle={{
        alignItems: 'center',
        minHeight: size * 2,
        height: '100%',
        paddingHorizontal: 8,
        paddingVertical: 1,
      }}
      style={{ width: containerWidth }}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={renderItems}
    />
  );
};

type circleType = {
  item: imageListType,
  index: number
} & IndicatorPropType

const Circle = ({ index, scrollX, size, radius, spacing, color, scrollRef, item, imageList }: circleType) => {


  //animated styles
  const rStyles = useAnimatedStyle(() => {

    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [1, 1.7, 1],
      Extrapolation.CLAMP
    )
    const inputRangeOp = [
      (index - 4) * width,
      (index - 3) * width,
      (index - 2) * width,
      (index - 1) * width,
      index * width,
      (index + 1) * width,
      (index + 2) * width,
      (index + 3) * width,
      (index + 5) * width,
    ];


    const opacity = interpolate(
      scrollX.value,
      inputRangeOp,
      [0.1, 0.2, 0.4, 0.5, 1, 0.5, 0.4, 0.2, 0.1],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }], opacity,
    }
  }, [scrollX]);

  return (
    <Animated.View
      key={index}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: radius,
          marginHorizontal: spacing,
        },
        rStyles
      ]}>
      {/* ---if images---- */}
      {
        imageList?.length! > 0 ? (
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: radius,
            }}
            disabled={scrollRef ? false : true}
            onPress={() => {
              scrollRef?.current?.scrollToIndex({
                animated: true,
                index
              });
            }}>
            <Image
              source={item.uri}
              style={{
                width: '90%',
                height: '90%',
                borderRadius: radius,
              }}
            />
          </TouchableOpacity>

        ) : null
      }
    </Animated.View>
  );
}