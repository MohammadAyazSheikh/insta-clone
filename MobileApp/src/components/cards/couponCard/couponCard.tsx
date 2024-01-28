import React, { useState } from 'react';
import { View, Text, Switch, ViewStyle } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import { fontStyle } from '../../../theme/fonts';
import { TouchableRipple } from 'react-native-paper';
import CustomButton from '../../general/customButton/customButton';
import IconFe from 'react-native-vector-icons/Feather';
type cardType = {
  containerStyles?: ViewStyle;
  onPress?: () => void;
  onBtnInvoice?: () => void;
};

const CouponCard = ({
  containerStyles,
  onPress = () => '',
  onBtnInvoice = () => ''
}: cardType) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const colors = useAppThemeColors();
  const { styles } = useFunctionalOrientation(responsiveStyles);

  return (
    <TouchableRipple
      style={[styles.cardView, containerStyles]}
      rippleColor={'rgb(255, 114, 94,0.5)'}
      borderless
      onPress={onPress}>
      <View style={styles.body}>
        <View style={styles.topView}>
          <Text style={styles.txtOrderNo} allowFontScaling={fontStyle.fontScale}>
            Discount on 1st purchase
          </Text>
          <Text style={styles.txtOrderTime} allowFontScaling={fontStyle.fontScale}>
            Discount Type: percent
          </Text>
        </View>

        <View style={styles.rowSpaceBetween}>
          <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
            Validity
          </Text>
          <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
            2024-July-11
          </Text>
        </View>
        <View style={styles.rowSpaceBetween}>
          <View>
            <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              Min discount: $130.00
            </Text>
            <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              Max Discount: $400.00
            </Text>
          </View>

          {/* controls */}
          <View style={styles.buttonsView}>
            <Switch
              trackColor={{ false: colors.secondary4, true: colors.primary1 }}
              thumbColor={isEnabled ? colors.primary2 : colors.primary3}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsEnabled(prev => !prev)}
              value={isEnabled}
            />
            <TouchableRipple
              style={[styles.btnView]}
              rippleColor={'rgb(255, 114, 94,0.5)'}
              borderless
              onPress={() => ''}>
              <IconFe name="edit" color={colors.primary5} size={22} />
            </TouchableRipple>
            <TouchableRipple
              style={[styles.btnView]}
              rippleColor={'rgb(255, 114, 94,0.5)'}
              borderless
              onPress={() => ''}>
              <IconFe name="trash-2" color={colors.primary4} size={22} />
            </TouchableRipple>
          </View>
        </View>
      </View>
    </TouchableRipple >
  );
};

export default CouponCard;
