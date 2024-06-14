import React, { useEffect } from 'react';
import {
  Modal, View, Pressable
} from 'react-native';
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import Animated, { Extrapolate, Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import CustomButton from '../../general/customButton/customButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../../routes/rootStack/rootNavigation';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type attachSheetProps = {
  showMenu: boolean,
  onClose: () => void,
  onSearch: () => void,
}
const ChatHeaderMenu = ({ showMenu, onClose, onSearch }: attachSheetProps) => {

  const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
  const { styles } = useFunctionalOrientation(responsiveStyles);
  // const colors = useAppThemeColors();


  const animValue = useSharedValue(0);

  const openMenu = () => {
    animValue.value = withTiming(1, { duration: 200 });
  };

  const closeMenu = () => {
    animValue.value = 0;  //withTiming(0, { duration: 200 });
  };


  const inputRange = [0, 0.5, 1];

  const stylesAnim = useAnimatedStyle(() => {

    const scaleY = interpolate(
      animValue.value,
      inputRange,
      [0, 0.5, 1],
      Extrapolation.CLAMP
    );


    return {
      transform: [
        { scaleY },
      ],
    };

  });

  useEffect(() => {
    !showMenu &&
      closeMenu();
  }, [showMenu])


  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={showMenu}
      onRequestClose={onClose}
      onShow={() => openMenu()}
    >
      {/* backdrop */}
      <View
        style={styles.backDrop}
      />
      <SafeAreaProvider>
        {/* container */}
        <SafeAreaView style={{ flex: 1 }}>
          <Pressable
            style={styles.containerMenu}
            onPress={() => onClose()}
          >
            <Animated.View style={[styles.menuBox, stylesAnim]}>
              <CustomButton
                textProps={{ style: styles.txtBtnMenu }}
                style={styles.btnMenu}
                buttonText='View contact'
                onPress={() => {
                  navigation.navigate('Profile')
                  onClose();
                }}
              />
              <CustomButton
                textProps={{ style: styles.txtBtnMenu }}
                style={styles.btnMenu}
                buttonText='Media, links and docs'
                onPress={() => onClose()}
              />
              <CustomButton
                textProps={{ style: styles.txtBtnMenu }}
                style={styles.btnMenu}
                buttonText='Search'
                onPress={() => {
                  onSearch && onSearch()
                  onClose();
                }}
              />
            </Animated.View >
          </Pressable>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal >

  );
};

export default ChatHeaderMenu;