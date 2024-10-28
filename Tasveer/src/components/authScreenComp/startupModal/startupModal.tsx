import React, {useState, useRef} from 'react';
import {Modal, ViewProps, View, Animated} from 'react-native';
import {useFunctionalOrientation} from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import {Text} from 'react-native-paper';
import {fontStyle} from '../../../theme/fonts';
import {Image} from 'react-native';
import AnimatedButton from '../animatedButton/animatedButton';
import {useAppThemeColors} from '../../../utils/functions/responsiveUtils';

const data = [
  {
    id: 1,
    image: require('../../../../assets/icons/mobile-payment.png'),
    text: 'Empower your business with our intuitive POS',
  },
  {
    id: 2,
    image: require('../../../../assets/icons/contactless.png'),
    text: 'Seamless transactions, amplified sales',
  },
  {
    id: 3,
    image: require('../../../../assets/icons/pos-terminal.png'),
    text: 'Transforming transactions into experiences',
  },
  {
    id: 4,
    image: require('../../../../assets/icons/smartphone_cash.png'),
    text: 'Join us in redefining the way you sell',
  },
];

type modalType = {
  show?: boolean;
  centerViewProps?: ViewProps;
  modalViewProps?: ViewProps;
  backDropProps?: ViewProps;
};

const StartupModal = ({
  centerViewProps,
  modalViewProps,
  backDropProps,
}: modalType) => {
  const [show, setShow] = useState(true);
  const {styles} = useFunctionalOrientation(responsiveStyles);
  //for header animation
  const scrollX = useRef(new Animated.Value(1)).current;

  const colors = useAppThemeColors();

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={show}>
        <View style={styles.backDrop} {...backDropProps} />
        <View style={styles.centeredView} {...centerViewProps}>
          <View style={styles.modalView} {...modalViewProps}>
            <View style={{flex: 2}}>
              <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                contentContainerStyle={styles.scrollContainer}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {x: scrollX}}}],
                  {useNativeDriver: true},
                )}>
                {data.map(item => (
                  <View style={styles.sliderContainer} key={item.id}>
                    <View style={styles.imgView}>
                      <Image style={styles.imgStyle} source={item.image} />
                    </View>
                    <View style={styles.descView}>
                      <Text
                        style={styles.txtDesc}
                        allowFontScaling={fontStyle.fontScale}>
                        {item.text}
                      </Text>
                    </View>
                  </View>
                ))}
              </Animated.ScrollView>
            </View>
            <View style={styles.bottomSliderView}>
              <AnimatedButton
                color={colors.primary4}
                scrollX={scrollX}
                dataLength={data.length}
                radius={60}
                iconSize={35}
                onPress={() => setShow(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default StartupModal;
