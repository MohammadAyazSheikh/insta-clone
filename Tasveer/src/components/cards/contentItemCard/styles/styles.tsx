import { createStyleSheet } from "react-native-unistyles";

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing } = theme;
    return ({
        container: {
            width: 'auto',
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: colors.primary1,
        },
        reelContainer: {
            aspectRatio: 1 / 2,
        },
        imgStyles: {
            width: '100%',
            height: '100%'
        },
        iconStyles: {
            position: 'absolute',
            top: 10,
            right: 10
        },
    })
});

export default styleSheet;