import { createStyleSheet } from 'react-native-unistyles';

const styleSheet = createStyleSheet((theme) => {

    return ({
        container: {
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 5,
        },
        row: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignSelf: 'flex-start',
            paddingHorizontal: theme.spacing.md
        },
        btnStyle: {
            marginHorizontal: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        txtEngagement: {
            color: theme.colors.secondary1,
            fontSize: theme.fontSize.lg,
        },
        captionView: {
            alignSelf: 'flex-start',
            alignItems: 'flex-start',
            marginHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md
        },
        txtTime: {
            color: theme.colors.common.grey1,
            fontSize: theme.fontSize.sm,
        },
    })
});

export default styleSheet;

