import React from 'react';
import { View, Text, Image, ViewStyle } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../../routes/rootNavigation';
// import responsiveStyles from './styles/styles';
import debitCreditCardStyles from '../debitCreditCard/styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import { fontStyle } from '../../../theme/fonts';
import { TouchableRipple } from 'react-native-paper';
import IconFe from 'react-native-vector-icons/Feather';
import IconFo from 'react-native-vector-icons/Foundation';
import CustomButton from '../../general/customButton/customButton';
type cardType = {
  containerStyles?: ViewStyle;
  onPress?: () => void;
  title?: string,
  showButtons?: boolean,
};

const SupplierCard = ({
  containerStyles,
  onPress = () => '',
  title = "Account",
  showButtons = false
}: cardType) => {
  
  const colors = useAppThemeColors();
  const { styles } = useFunctionalOrientation(debitCreditCardStyles);
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>();

  return (
    <TouchableRipple
      style={[styles.cardView, containerStyles]}
      rippleColor={'rgb(255, 114, 94,0.5)'}
      borderless
      onPress={onPress}>
      <View style={styles.body}>
        <View style={styles.topView}>
          {/* image */}
          <View style={styles.rowHeader}>
            <View style={styles.cardImageView}>
              <Image
                style={styles.cardImage}
                source={require('../../../../assets/icons/user.jpg')} />
            </View>
            <View>
              <Text style={styles.txtOrderNo} allowFontScaling={fontStyle.fontScale}>
                {title}
              </Text>
              <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
                Total Products: 16
              </Text>
            </View>
          </View>
          {/* controls */}
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
        <View
          style={styles.dashedLine}
        />
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.txtTitle} allowFontScaling={fontStyle.fontScale}>
            {`${title.split(' ').join('').toLowerCase()}@gmail.com`}
          </Text>
        </View>
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
            0946825184058
          </Text>
          {/* Buttons */}
          <View style={{
            alignItems: 'flex-end'
          }}>
            {/* transaction button */}
            <CustomButton
              buttonText='Transaction  '
              textProps={{ style: styles.txtTitle }}
              style={{
                width: 'auto',
                height: 'auto',
                backgroundColor: 'transparent'
              }}
              icon={() => <IconFo name="clipboard-notes" color={colors.primary5} size={22} />}
              onPress={()=> navigation.navigate('SupplierTransactionList')}
            />
            {/* product button */}
            <CustomButton
              buttonText='Products  '
              textProps={{ style: styles.txtTitle }}
              style={{
                width: 'auto',
                height: 'auto',
                backgroundColor: 'transparent'
              }}
              icon={() => <IconFe name="box" color={colors.primary3} size={22} />}
              onPress={()=> navigation.navigate('LimitedStock')}
            />
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default SupplierCard;
