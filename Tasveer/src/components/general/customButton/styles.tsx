import { createStyleSheet } from 'react-native-unistyles';
import { fontFamily } from '../../../theme/fonts';

const styleSheet = createStyleSheet((theme) => {
    const { colors, fontSize } = theme;

    return ({

        btnView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.ternary1,
            width: "85%",
            height: 50,
            borderRadius: 5,
            paddingHorizontal: 5,
            marginVertical: 5,
        },
        btnOutlinedView: {
            borderWidth: 1,
            borderColor: colors.secondary1,
            backgroundColor: colors.primary1
        },
        disableStyle: {
            backgroundColor: colors.ternary2,
        },
        txtBtn: {
            color: "#fff",
            fontFamily: fontFamily.bold,
            fontSize: fontSize.md
        },
        txtOutlinedBtn: {
            color: "#fff",
        }
    })
});

export default styleSheet;





