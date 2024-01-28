import React from 'react';
import { View, Text, Image, ViewStyle } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
// import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import { fontStyle } from '../../../theme/fonts';
import { TouchableRipple } from 'react-native-paper';
import CustomButton from '../../general/customButton/customButton';

type cardType = {
  containerStyles?: ViewStyle;
  onPress?: () => void;
  onBtnInvoice?: () => void;
  data: any,
};

const OrderCard = ({
  containerStyles,
  onPress = () => '',
  onBtnInvoice = () => '',
  data = {},
}: cardType) => {
  // const colors = useAppThemeColors();
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
            Ref No. {data?.reference_no}
          </Text>
          <Text style={styles.txtOrderTime} allowFontScaling={fontStyle.fontScale}>
            {data?.date}
          </Text>
        </View>
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.txtTitle} allowFontScaling={fontStyle.fontScale}>
            Order Summary
          </Text>
        </View>
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
            Biller: {data?.biller}
          </Text>
        </View>
        <View style={styles.rowSpaceBetween}>
          <View>
            <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              Customer: {data?.customer}
            </Text>
            <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              Grand Total: {data?.total}
            </Text>
            <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              Paid Amount: {data?.paid}
            </Text>
          </View>
          <View />
        </View>
        <View style={styles.rowSpaceBetween}>
          <View>
            <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              Due Amount: {(Number(data?.total) - Number(data?.paid)).toFixed(3)}
            </Text>
            <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              Sale Status: {data?.sale_status}
            </Text>
          </View>
          <CustomButton
            style={styles.btnStyle}
            buttonText='Invoice'
            onPress={onBtnInvoice}
          />
        </View>
      </View>
    </TouchableRipple>
  );
};

export default OrderCard;
