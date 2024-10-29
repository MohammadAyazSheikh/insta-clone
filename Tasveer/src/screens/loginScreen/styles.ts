import { createStyleSheet } from 'react-native-unistyles';

const styleSheet = createStyleSheet((theme, runTime) => {
    const { colors } = theme;
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
            alignItems: 'center',
        },
        logoStyles: {
            width: "55%",
            resizeMode: 'contain',
            marginTop: '40%',
            marginBottom: '10%'
        },
        txtForgetPss: {
            fontSize: 12,
            color: colors.common.grey1,
            marginVertical: 10
        },
        row: {
            width: '85%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        line: {
            flex: 1,
            paddingVertical: 0.7,
            opacity: 0.2,
            backgroundColor: colors.common.grey1,
        }
    })
});

export default styleSheet;





