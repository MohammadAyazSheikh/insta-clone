import { StyleSheet } from "react-native";
import { fontFamily } from "../../../theme/fonts";
import { heightToDp } from "../../../utils/functions/responsiveUtils";
import { getShadow } from "../../../theme/platformSpecificStyles";

export const styles = StyleSheet.create({
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