import React from 'react';
import { View, Text, Image, ViewStyle } from 'react-native';
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
  title?: string,
  showButtons?: boolean,
};

const AccountCard = ({
  containerStyles,
  onPress = () => '',
  title = "Account",
  showButtons = false
}: cardType) => {
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
            {title}
          </Text>
          {
            showButtons ?
              <View style={styles.buttonsView}>

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
              : null
          }
        </View>
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.txtTitle} allowFontScaling={fontStyle.fontScale}>
            Balance Info
          </Text>
        </View>
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
            Balance
          </Text>
          <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
            5086
          </Text>
        </View>
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
            Total in
          </Text>
          <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
            234342
          </Text>
        </View>
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
            Total out
          </Text>
          <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
            93736
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default AccountCard;
