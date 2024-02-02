import Toast, { ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import IconOct from 'react-native-vector-icons/Octicons';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';

import { fontFamily } from './fonts';
import { heightToDp, useAppThemeColors } from '../utils/functions/responsiveUtils';
import { TextBold, TextRegular } from '../components/general/text/text';
import { useAppSelector } from '../redux/hooks';
import { getShadow } from './platformSpecificStyles';
import { TouchableRipple } from 'react-native-paper';

interface ToastConfigProps {
  text1: string;
  text2: string;
  props: any;
}

const toastConfig: ToastConfig = {
  // success
  successMsg: ({ text1, text2, props }: ToastConfigParams<ToastConfigProps>) => (
    <View style={[styles.container, { backgroundColor: '#EBF7EE', borderColor: '#3BB75C' }]}>
      <IconOct color={'#3BB75C'} name="check-circle-fill" size={34} />
      <View style={styles.txtView}>
        <Text style={[styles.txtHeading]} numberOfLines={1} allowFontScaling={false}>
          {text1}
        </Text>
        <Text style={[styles.txtDesc, { color: '#3BB75C' }]} numberOfLines={2} allowFontScaling={false}>
          {text2}
        </Text>
      </View>
    </View>
  ),

  // error
  errorMsg: ({ text1, text2, props }: ToastConfigParams<ToastConfigProps>) => (
    <View style={[styles.container, { backgroundColor: '#FCEDEA', borderColor: '#EC4E2C' }]}>
      <IconEnt color={'#EC4E2C'} name="warning" size={34} />
      <View style={styles.txtView}>
        <Text style={[styles.txtHeading]} numberOfLines={1} allowFontScaling={false}>
          {text1}
        </Text>
        <Text style={[styles.txtDesc, { color: '#EC4E2C' }]} numberOfLines={2} allowFontScaling={false}>
          {text2}
        </Text>
      </View>
    </View>
  ),

  // warning
  warningMsg: ({ text1, text2, props }: ToastConfigParams<ToastConfigProps>) => (
    <View style={[styles.container, { backgroundColor: '#FEF7EA', borderColor: '#EF9400' }]}>
      <IconEnt color={'#EF9400'} name="warning" size={34} />
      <View style={styles.txtView}>
        <Text style={[styles.txtHeading]} numberOfLines={1} allowFontScaling={false}>
          {text1}
        </Text>
        <Text style={[styles.txtDesc, { color: '#EF9400' }]} numberOfLines={2} allowFontScaling={false}>
          {text2}
        </Text>
      </View>
    </View>
  ),

  // info
  infoMsg: ({ text1, text2, props }: ToastConfigParams<ToastConfigProps>) => (
    <View style={[styles.container, { backgroundColor: '#FEFFFF', borderColor: '#006DE5' }]}>
      <IconAnt color={'#006DE5'} name="infocirlce" size={34} />
      <View style={styles.txtView}>
        <Text style={[styles.txtHeading]} numberOfLines={1} allowFontScaling={false}>
          {text1}
        </Text>
        <Text style={[styles.txtDesc, { color: '#006DE5' }]} numberOfLines={2} allowFontScaling={false}>
          {text2}
        </Text>
      </View>
    </View>
  ),

  // Dismiss alert
  dismissAlert: ({ text1, text2, onPress, props }: ToastConfigParams<ToastConfigProps>) => {
    const colors = useAppThemeColors();
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";
    return (
      <View style={styles.alertContainer}>
        <View style={[styles.alertView, {
          backgroundColor:
            isDark ? colors.primary4 : "#FFF"
        }]}>
          <View style={styles.alertTextView}>
            <TextBold style={[
              styles.txtAlertTitle,
              { color: colors.secondary1 }
            ]}
              numberOfLines={1}
            >
              {text1}
            </TextBold>
            <TextRegular style={[
              styles.txtAlertSubTitle,
              { color: colors.grey1 }
            ]}
              numberOfLines={3}
            >
              {text2}
            </TextRegular>
          </View>
          {/* dismiss button */}
          <TouchableRipple
            rippleColor={
              isDark ?
                'rgba(255,255,255,0.2)'
                :
                'rgba(000,000,000,0.2)'
            }
            borderless
            onPress={onPress}
            style={[styles.alertBtn, { borderTopColor: colors.primary3 }]}>
            <TextBold style={[{ color: colors.ternary1, fontSize: 16 }]}>
              Dismiss
            </TextBold>
          </TouchableRipple>
        </View>
      </View>
    )
  },

  // Confirm alert
  confirmAlert: ({ text1, text2, onPress, props }: ToastConfigParams<ToastConfigProps>) => {
    const colors = useAppThemeColors();
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";
    return (
      <View style={styles.alertContainer}>
        <View style={[styles.alertView, {
          height: 225,
          backgroundColor:
            isDark ? colors.primary4 : "#FFF"
        }]}>
          <View style={[styles.alertTextView, { height: '60%' }]}>
            <TextBold style={[
              styles.txtAlertTitle,
              { color: colors.secondary1 }
            ]}
              numberOfLines={1}
            >
              {text1}
            </TextBold>
            <TextRegular style={[
              styles.txtAlertSubTitle,
              { color: colors.grey1 }
            ]}
              numberOfLines={3}
            >
              {text2}
            </TextRegular>
          </View>
          {/* dismiss button */}
          <TouchableRipple
            rippleColor={
              isDark ?
                'rgba(255,255,255,0.2)'
                :
                'rgba(000,000,000,0.2)'
            }
            borderless
            onPress={onPress}
            style={[styles.alertBtn, { borderTopColor: colors.primary3, height: '20%' }]}>
            <TextBold style={[{ color: colors.ternary1, fontSize: 16 }]}>
              {props?.confirmText}
            </TextBold>
          </TouchableRipple>
          {/* dismiss button */}
          <TouchableRipple
            rippleColor={
              isDark ?
                'rgba(255,255,255,0.2)'
                :
                'rgba(000,000,000,0.2)'
            }
            borderless
            onPress={onPress}
            style={[styles.alertBtn, { borderTopColor: colors.primary3, height: '20%' }]}>
            <TextRegular style={[{ color: colors.grey1, fontSize: 16 }]}>
              {props?.dismissText}
            </TextRegular>
          </TouchableRipple>
        </View>
      </View>
    )
  },
};



const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  txtView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  txtHeading: {
    color: '#000',
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },

  txtDesc: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: 'black',
  },
  // alert
  alertContainer: {
    width: '100%',
    height: heightToDp(100),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(44, 44, 44, 0.1)'
  },
  alertView: {
    height: 180,
    width: '70%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...getShadow({ elevation: 5 })
  },

  alertTextView: {
    width: '100%',
    height: "75%",
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBtn: {
    width: '100%',
    height: "25%",
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
  },
  txtAlertTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  txtAlertSubTitle: {
    fontSize: 14,
    textAlign: 'center'
  },

});

export default toastConfig;
