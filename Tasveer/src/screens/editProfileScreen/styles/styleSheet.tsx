import { createStyleSheet } from "react-native-unistyles";
import { widthToDp as w } from "../../../utils/functions/responsiveUtils";

const styleSheet = createStyleSheet((theme) => {
    const { colors,spacing } = theme;
    return ({
        container: {
            flex: 1,
            width: w(100),
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
        },
        scroll: {
            flex: 1,
            alignItems: "center",
            paddingVertical:20
        },
        textBoxContainer: {
            marginTop: spacing.xxl,
        },
        textBoxBioContainer: {
            height: "20%",
            marginVertical: spacing.xxl,
        },
        inputBioStyle: {
            height: "100%",
            textAlignVertical: "top",
        }
    })
});

export default styleSheet;