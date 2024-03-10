
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';
import { getShadow } from '../../../../theme/platformSpecificStyles';



type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          backDrop: {
            ...StyleSheet.absoluteFill,
            backgroundColor: "black",
            opacity: 0.8
          },
          alertView: {
            width: h(70),
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            ...getShadow({ elevation: 5 })
          },
      
          alertTextView: {
            width: '100%',
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          },
          alertBtn: {
            width: '100%',
            paddingVertical: 15,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 1,
          },
          txtAlertTitle: {
            fontSize: 18,
            textAlign: 'center',
          },
          txtAlertSubTitle: {
            fontSize: 16,
            textAlign: 'center',
            marginTop: 10,
          },
    });
}

export default landscapeStyles;



