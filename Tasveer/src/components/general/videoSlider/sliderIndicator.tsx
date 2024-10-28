import React, { useRef, useEffect } from 'react';
import { Animated, Image, TouchableOpacity, ScrollView } from 'react-native';
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';


type IndicatorPropType = {
  scrollX: Animated.Value;
  length?: number;
  size?: number;
  color?: string;
  radius?: number;
  spacing?: number;
  containerWidth?: number;
  imageList?: any[];
  scrollRef?: React.RefObject<ScrollView>;
};

export const SliderIndicator = ({
  scrollX,
  length = 3,
  size = 30,
  color = 'red',
  radius = 10,
  spacing = 7,
  imageList = [],
  scrollRef,
  containerWidth = (size + spacing) * 4,
}: IndicatorPropType) => {

  const { styles, widthToDp: w } = useFunctionalOrientation(responsiveStyles);

  const data = imageList.length > 0 ? imageList : new Array(length).fill(1);
  const IndicatorScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    //listening on slider scroll animated value
    scrollX.addListener(event => {
      const val = w(100) / (size + spacing);
      IndicatorScrollRef?.current?.scrollTo({
        x: event.value / val,
        y: 0,
        animated: true,
      });
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  return (
    <ScrollView
      horizontal
      ref={IndicatorScrollRef}
      contentContainerStyle={{
        alignItems: 'center',
        height: size * 2,
        paddingHorizontal: 8,
      }}
      style={{ width: containerWidth }}>
      {data.map((item, index) => {
        const inputRange = [
          (index - 1) * w(100),
          index * w(100),
          (index + 1) * w(100),
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [1, 1.7, 1],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });

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
              { transform: [{ scale }], opacity },
            ]}>
            {imageList?.length > 0 ? (
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
                  scrollRef?.current?.scrollTo({
                    x: inputRange[1],
                    y: 0,
                    animated: true,
                  });
                }}>
                <Image
               source={{uri:item.path}}
                  style={{
                    width: '90%',
                    height: '90%',
                    borderRadius: radius,
                  }}
                />
              </TouchableOpacity>
            ) : null}
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};
