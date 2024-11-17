import { createStyleSheet } from "react-native-unistyles";
import { widthToDp as w, heightToDp as h } from "../../../utils/functions/responsiveUtils";

const styleSheet = createStyleSheet((theme) => {
    const { colors } = theme;
    return ({
        container: {
            backgroundColor: colors.primary1,
            flex: 1
        },
        scrollContainer: {
            height: h(100),
            width: w(100)
        },
    })
});

export default styleSheet;