import { createStyleSheet } from "react-native-unistyles";
import { widthToDp as w, heightToDp as h } from "../../../../utils/functions/responsiveUtils";
import { StyleSheet } from "react-native";
import { getShadow } from "../../../../theme/platformSpecificStyles";

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing, fontSize } = theme;
    return ({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        modalView: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: colors.secondary1,
            width: w(100),
            height: "100%"//h(100),
        },
        containerMap: {
            // ...StyleSheet.absoluteFillObject,
            flex: 1,
            width: w(100),
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: spacing?.xxl,
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
        inputView: {
            position: 'absolute',
            top: 10,
            right: 0,
            width: w(100),
            justifyContent: 'center',
            alignItems: 'center',
        },
        inputViewInner: {
            width: w(90),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: spacing?.lg,
            borderRadius: spacing?.lg,
            backgroundColor: "#EFEFEF",
            ...getShadow({  }),
            position: 'relative'
        },
        txtInput: {
            flex: 1,
            marginRight: 5,
            color: colors.secondary1,
            height: 45
        },
        suggestionView: {
            width: w(95),
            maxHeight: h(50),
            borderRadius: 10,
            backgroundColor: "#EFEFEF",
            position: 'absolute',
            top: 50,
            zIndex: 1
        },
        txtSuggestionView: {
            width: w(95),
            paddingHorizontal: spacing?.lg,
            paddingVertical: spacing?.md
        },
        txtSuggestion: {
            color: colors.common?.grey1,
            fontSize: fontSize?.md
        },
        locationIconView: {

            backgroundColor: colors.primary3,
            padding: spacing?.md,
            borderRadius: 100,
        },
    });
});

export default styleSheet;