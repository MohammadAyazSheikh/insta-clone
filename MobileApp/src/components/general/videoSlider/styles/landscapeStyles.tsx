
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';

type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        // slider
        sliderContainer: {
            width: w(100),
            backgroundColor: colors.secondary1,
            alignItems: 'center',
        },
        slideVideoView: {
            width: h(100),
            height: w(30),
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
            backgroundColor: 'black'
        },
        videoStyles: {
            width: w(90),
            height: '100%',
            borderRadius: 20,
        },
        // modal
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalView: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.secondary1,
        },
        SliderView: {
            width: '100%',
            height: '100%',
        },
        btnStyle: {
            padding: 3,
            borderRadius: 20,
            backgroundColor: colors.primary1,
            position: 'absolute',
            left: 20,
            top: 20,
        },
        // sender row
        senderContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
            height: w(10),
            width: '100%',
            position: 'absolute',
            bottom: 0,
        },
        txtInput: {
            flex: 1,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'gray',
            paddingHorizontal: 10,
        },
        btnSendStyle: {
            padding: 10,
            borderRadius: 100,
            backgroundColor: colors.primary2,
            marginLeft: 10,
        },
    });
}

export default landscapeStyles;



