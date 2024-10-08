
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { BUTTON_SIZE } from '../../sound/animatedRecorder';

type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        containerCol: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        containerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primary1,
            paddingHorizontal: 8,
            paddingVertical:10,
            maxHeight: h(20),
            width: "100%",
        },
        txtInput: {
            flex: 1,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'gray',
            paddingHorizontal: 10,
            paddingTop:10,
            paddingBottom:10,
            color:colors.secondary1,
        },
        btnStyle: {
            width: h(BUTTON_SIZE),
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: colors.ternary1,
            marginLeft: 10,
        },
        //---------------------------Attachment Sheet-----------------
        containerAttach: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        backDrop: {
            ...StyleSheet.absoluteFill,
            backgroundColor: "black",
            opacity: 0
        },
        attachBox: {
            width: h(90),
            // aspectRatio: 1,
            backgroundColor: colors.primary3,
            position: 'absolute',
            borderRadius: 20,
            bottom: w(10),
            // left: w(2.5),
            alignItems: 'center',
            flexWrap: 'wrap',
            transformOrigin: "bottom right",
            overflow: 'hidden',
        },
        row: {
            width: '100%',
            paddingVertical: 20,
            flexDirection: "row",
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        attachBtn: {
            borderRadius: 1000,
            padding: 18,
            aspectRatio: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        txtBtnSheet: {
            fontSize: 12,
            color: "white",
        },
        // ------- reply footer -------
        replyFooter: {
            width: '100%',
            paddingVertical: 10,
            backgroundColor: colors.secondary2,
            paddingHorizontal: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
    });
}

export default landscapeStyles;



