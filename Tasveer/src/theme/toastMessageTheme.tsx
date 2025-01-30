import Toast, { ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconOct from '@expo/vector-icons/Octicons';
import IconEnt from '@expo/vector-icons/Entypo';
import IconAnt from '@expo/vector-icons/AntDesign';
import { fontFamily } from './fonts';
import { heightToDp } from '../utils/functions/responsiveUtils';
import { getShadow } from './platformSpecificStyles';

type props = {
  title: string,
  description: string,
  bgColor: string,
  textColor: string,
  type: "error" | "success" | "warning" | "info"
}

const icon = {
  "error": <IconEnt color={'#EC4E2C'} name="warning" size={34} />,
  "success": <IconOct color={'#3BB75C'} name="check-circle-fill" size={34} />,
  "warning": <IconEnt color={'#EF9400'} name="warning" size={34} />,
  "info": <IconAnt color={'#006DE5'} name="infocirlce" size={34} />
}

const ToastComp = ({ title, description, bgColor, textColor, type }: props) => {

  return (
    <View style={[styles.container, { backgroundColor: bgColor, borderColor: textColor }]}>
      {icon[type]}
      <View style={styles.txtView}>
        <Text style={[styles.txtHeading]} numberOfLines={1} allowFontScaling={false}>
          {title}
        </Text>
        {
          description ? <Text style={[styles.txtDesc, { color: textColor }]} numberOfLines={2} allowFontScaling={false}>
            {description}
          </Text>
            :
            null
        }
      </View>
    </View>
  )
}

interface ToastConfigProps {
  // MyText:string,
}

const toastConfig: ToastConfig = {
  // success
  successMsg: ({ text1, text2, props }: ToastConfigParams<ToastConfigProps>) => (
    <ToastComp
      type="success"
      title={text1!}
      description={text2!}
      bgColor={'#EBF7EE'}
      textColor={'#3BB75C'}
    />
  ),

  // error
  errorMsg: ({ text1, text2, props }: ToastConfigParams<ToastConfigProps>) => (
    <ToastComp
      type="error"
      title={text1!}
      description={text2!}
      bgColor={'#FCEDEA'}
      textColor={'#EC4E2C'}
    />
  ),

  // warning
  warningMsg: ({ text1, text2, props }: ToastConfigParams<ToastConfigProps>) => (
    <ToastComp
      type="warning"
      title={text1!}
      description={text2!}
      bgColor={'#FEF7EA'}
      textColor={'#EF9400'}
    />
  ),

  // info
  infoMsg: ({ text1, text2, props }: ToastConfigParams<ToastConfigProps>) => (
    <ToastComp
      type="info"
      title={text1!}
      description={text2!}
      bgColor={'#FEFFFF'}
      textColor={'#006DE5'}
    />
  ),

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
