import React from 'react';
import { View, Text, Image, ViewStyle } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../../routes/rootStack/rootNavigation';
// import responsiveStyles from './styles/styles';
import debitCreditCardStyles from '../debitCreditCard/styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import { fontStyle } from '../../../theme/fonts';
import { TouchableRipple } from 'react-native-paper';
import IconFe from 'react-native-vector-icons/Feather';
import IconFd from 'react-native-vector-icons/Foundation';
import IconFt from 'react-native-vector-icons/Fontisto';
import CustomButton from '../../general/customButton/customButton';
type cardType = {
  containerStyles?: ViewStyle;
  onPress?: () => void;
  title?: string,
  showButtons?: boolean,
  phone?:string,
  onBtnBalance?: () => void,
  onEdit?: () => void,
  onDelete?: () => void,
};

const CustomerCard = ({
  containerStyles,
  onPress = () => '',
  title = "Account",
  showButtons = false,
  onBtnBalance = () => '',
  onEdit = () => '',
  onDelete = () => '',
  phone,
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
            <View style = {{flex:1}}>
              <Text style={styles.txtOrderNo} allowFontScaling={fontStyle.fontScale}>
                {title}
              </Text>
              <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
                Total Orders: 9
              </Text>
              <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
                Balance: $ 0.0
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
                  onPress={onEdit}>
                  <IconFe name="edit" color={colors.primary5} size={22} />
                </TouchableRipple>
                <TouchableRipple
                  style={[styles.btnView]}
                  rippleColor={'rgb(255, 114, 94,0.5)'}
                  borderless
                  onPress={onDelete}>
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
          <View style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            height: '100%',
            flex:1,
          }}>
            <Text style={styles.txtTitle} allowFontScaling={fontStyle.fontScale} numberOfLines={2}>
              {phone}
            </Text>
            {/* <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              0946825184058
            </Text> */}
          </View>
          <View />
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
              icon={() => <IconFd name="clipboard-notes" color={colors.primary5} size={22} />}
              onPress={() => navigation.navigate('TransactionList')}
            />
            {/* order button */}
            <CustomButton
              buttonText='Orders  '
              textProps={{ style: styles.txtTitle }}
              style={{
                width: 'auto',
                height: 'auto',
                backgroundColor: 'transparent'
              }}
              icon={() => <IconFe name="box" color={colors.primary3} size={22} />}
              onPress={() => navigation.navigate('Orders')}
            />
            {/* balance button */}
            <CustomButton
              buttonText='Add Balance  '
              textProps={{ style: styles.txtTitle }}
              style={{
                width: 'auto',
                height: 'auto',
                backgroundColor: 'transparent'
              }}
              icon={() => <IconFt name="money-symbol" color={colors.primary2} size={22} />}
              onPress={onBtnBalance}
            />
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default CustomerCard;
