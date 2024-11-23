import { createStyleSheet } from 'react-native-unistyles';
import { widthToDp as w, heightToDp as h } from '../../../../utils/functions/responsiveUtils';

const styleSheet = createStyleSheet((theme) => {
    const { colors, fontSize, spacing } = theme;

    return ({
        // slider
        sliderContainer: {
            width: w(100),
            backgroundColor: colors.secondary1,
            alignItems: 'center',
        },
        slideVideoView: {
            width: w(100),
            height: "100%",
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "black",
        },
        videoStyles: {
            width: "100%",
            height: '100%',
            backgroundColor: "black",

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
            height: h(10),
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
            backgroundColor: colors.primary3,
            marginLeft: 10,
        },
    });
});
export default styleSheet;






