
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { getShadow } from '../../../../theme/platformSpecificStyles';

type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        // slider
        mainView: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
        },
        txtTime: {
            color: colors.secondary2,
        },

        //----------------------- sheet----------------
        centeredView: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        modalView: {
            justifyContent: 'space-between',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: colors.secondary2,
            borderRadius: 10,
            width: w(100),
        },

        containerInnerStyle: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: colors.secondary2,
            paddingVertical:30,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: 'hidden',
        },
        //recorder
        recordingView: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        circle: {
            width: w(40),
            height: w(40),
        },
        iconMicView: {
            borderRadius: 1100,
            justifyContent: "center",
            alignItems: 'center',
            width: w(25),
            height: w(25),
            backgroundColor: colors.primary3,
            position: 'absolute',
            alignSelf: 'center',
        },
        btnStop: {
            width: w(80),
            height: 40,
        },
        txtBtnStop: {
            color: "white",
            fontSize: 14,

        },

        txtRecordedTime: {
            color: "grey",
            fontSize: 14,
            marginBottom: 10,

        },
        //play voice style
        sliderStyle: {
            paddingVertical: 15,
            backgroundColor: '#F5F5F5',
            // width: '90%',
            borderRadius: 100,
            ...getShadow({ elevation: 5 }),
            width: w(90),
        },
        btnRow: {
            marginTop: 10,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        //btn Close
        btnClose: {
            position: 'absolute',
            left: 5,
            top: 5,
        },

    });
}

export default portraitStyles;



