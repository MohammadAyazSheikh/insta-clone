import { createStyleSheet } from "react-native-unistyles";
import { widthToDp as w, heightToDp as h, widthToDp } from "../../../../utils/functions/responsiveUtils";
import { BUTTON_SIZE } from '../../sound/animatedRecorder';
import { StyleSheet } from "react-native";

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing, fontSize } = theme;
    return ({
        containerCol: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        containerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primary1,
            paddingHorizontal: 8,
            paddingVertical: spacing?.lg,
            maxHeight: h(20),
            width: "100%",
        },
        txtInput: {
            flex: 1,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'gray',
            paddingHorizontal: spacing?.lg,
            paddingTop: spacing?.lg,
            paddingBottom: spacing?.lg,
            color: colors.secondary1,
        },
        btnStyle: {
            width: w(BUTTON_SIZE),
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: colors.ternary1,
            marginLeft: spacing?.lg,
        },
        //---------------------------Attachment Sheet-----------------
        containerAttach: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        backDrop: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "black",
            opacity: 0
        },
        attachBox: {
            width: w(90),
            // aspectRatio: 1,
            backgroundColor: colors.primary3,
            position: 'absolute',
            borderRadius: 20,
            bottom: h(10),
            // left: w(2.5),
            alignItems: 'center',
            flexWrap: 'wrap',
            transformOrigin: "bottom right",
            overflow: 'hidden',
        },
        row: {
            width: '100%',
            paddingVertical: spacing?.xxl,
            flexDirection: "row",
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        attachBtn: {
            borderRadius: 1000,
            padding: spacing?.xxl,
            aspectRatio: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        txtBtnSheet: {
            fontSize: fontSize?.sm,
            color: "white",
        },
        // ------- reply footer -------
        replyFooter: {
            width: '100%',
            paddingVertical: 10,
            backgroundColor: colors.secondary1,
            paddingHorizontal: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
    });
});

export default styleSheet;