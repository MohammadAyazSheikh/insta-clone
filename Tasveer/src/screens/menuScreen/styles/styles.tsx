import { createStyleSheet } from 'react-native-unistyles';

const styleSheet = createStyleSheet((theme, runTime) => {
    const { colors, fontSize, spacing } = theme;
    const { width } = runTime.screen;
    return ({
        container: {
            flex: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        scroll: {
            width,
            paddingTop: 10,
        },

        itemContainer: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: spacing.lg,
            paddingHorizontal: spacing?.lg
        },
        itemHeaderContainer: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor:colors.primary1,
            paddingTop: spacing.md,
            paddingBottom: spacing?.lg,
            paddingHorizontal: spacing?.lg,
            borderTopWidth:spacing.md,
            borderTopColor:colors.primary3
        },
        txtItem:{
            fontSize:fontSize.lg
        },
        txtHeader: {
            color: colors.ternary3
        },
        txtLogout:{
            color:"red",
            fontSize:fontSize.lg
        },

    })
});

export default styleSheet;





