import { createStyleSheet } from "react-native-unistyles";

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing } = theme;
    return ({
        container: {
            flex: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: spacing.lg,
        },
        scroll: {
            paddingTop: spacing.lg,
            paddingBottom: 150
        },
        headerView:{
            flexDirection:"row",
            alignItems:'center',
            width:"100%",
            paddingHorizontal:spacing?.lg
        },
    })
});

export default styleSheet;