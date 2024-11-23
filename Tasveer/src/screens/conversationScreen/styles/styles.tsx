import { createStyleSheet } from "react-native-unistyles";
import { widthToDp as w, heightToDp as h } from "../../../utils/functions/responsiveUtils";

const styleSheet = createStyleSheet((theme, runTime) => {
    const { colors } = theme;
    const { screen: { height } } = runTime;
    return ({
        container: {
            backgroundColor: colors.primary1,
            flex: 1,
            justifyContent:"space-between"
        },
        scrollContainer: {
            width: w(100),
        },
    })
});

export default styleSheet;