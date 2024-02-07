
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';
import { getShadow } from '../../../../theme/platformSpecificStyles';


type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

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
            height: h(100),
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
}

export default portraitStyles;



