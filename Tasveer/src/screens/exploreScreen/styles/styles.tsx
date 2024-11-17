import { createStyleSheet } from "react-native-unistyles";
import { widthToDp as w } from "../../../utils/functions/responsiveUtils";

const styleSheet = createStyleSheet((theme) => {
    const { colors } = theme;
    return ({
        container: {
            flex: 1,
            width:w(100),
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
        },
        scroll: {
            width: w(100),
        },
    })
});

export default styleSheet;