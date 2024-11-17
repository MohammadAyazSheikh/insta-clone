import { createStyleSheet } from "react-native-unistyles";
import { widthToDp as w, heightToDp as h } from "../../../../utils/functions/responsiveUtils";

const styleSheet = createStyleSheet((theme) => {
    const { spacing } = theme;
    return ({
        videoView: {
            width: w(70),
            height: h(50),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "black",
            marginBottom: spacing?.lg
        },
        videoStyles: {
            width: "100%",
            height: '100%',
            backgroundColor: "black",

        },
        btnPlay: {
            backgroundColor: 'white',
            borderRadius: 100,
            padding: 0.5,
            position: 'absolute'
        },
    })
});

export default styleSheet;