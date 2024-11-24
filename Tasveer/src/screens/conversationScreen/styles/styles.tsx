import { createStyleSheet } from "react-native-unistyles";
import { widthToDp as w } from "../../../utils/functions/responsiveUtils";

const styleSheet = createStyleSheet((theme, runTime) => {
    const { colors } = theme;
    return ({
        container: {
            backgroundColor: colors.primary1,
            flex: 1,
        },
        scrollContainer: {
            width: w(100),
        },
    })
});

export default styleSheet;