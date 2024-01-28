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
  onEdit?: () => void;
  onDlt?: () => void;
  title?: string,
  showButtons?: boolean,
  category?: number | string,
  warehouse?: number | string,
  date?: string,
  note?: string,
};

const DebitCreditCard = ({
  containerStyles,
  onPress = () => '',
  onEdit = () => '',
  onDlt = () => '',
  title = "Account",
  showButtons = false,
  date,
  category,
  warehouse,
  note,
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
                  onPress={onEdit}>
                  <IconFe name="edit" color={colors.primary5} size={22} />
                </TouchableRipple>
                <TouchableRipple
                  style={[styles.btnView]}
                  rippleColor={'rgb(255, 114, 94,0.5)'}
                  borderless
                  onPress={onDlt}>
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
          {/* <Text style={styles.txtTitle} allowFontScaling={fontStyle.fontScale}>
            Transaction date: 2023-09-12
          </Text> */}
        </View>
        {
          category ? <View style={styles.rowSpaceBetween}>
            <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              Category ID
            </Text>
            <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              {category}
            </Text>
          </View>
            : null
        }
        {
          warehouse ? <View style={styles.rowSpaceBetween}>
            <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              Warehouse ID
            </Text>
            <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              {warehouse}
            </Text>
          </View>
            : null
        }
        {
          date ? <View style={styles.rowSpaceBetween}>
            <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              Date
            </Text>
            <Text style={styles.txtValue} allowFontScaling={fontStyle.fontScale}>
              {date}
            </Text>
          </View>
            : null
        }
        {note ? <>
          <View
            style={styles.dashedLine}
          />
          <View style={styles.rowSpaceBetween}>
            <Text style={styles.txtTitle} allowFontScaling={fontStyle.fontScale}>
              Note:
            </Text>
          </View>
          <View style={styles.rowSpaceBetween}>
            <Text style={styles.txtTitle} allowFontScaling={fontStyle.fontScale}>
              {note}
            </Text>
          </View>
        </>
          : null
        }
      </View>
    </TouchableRipple >
  );
};

export default DebitCreditCard;
