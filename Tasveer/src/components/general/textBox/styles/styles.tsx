
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily, } from '../../../../theme/fonts';
import { createStyleSheet } from 'react-native-unistyles';


const styleSheet = createStyleSheet((theme, runTime) => {
    const { colors, spacing } = theme;
    const { width } = runTime.screen;
    return ({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            width: "85%",
        },
        //text input
        inputView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary3,
            width: "100%",
            height: 50,
            borderRadius: 5,
            paddingHorizontal: 5,
            marginVertical: 5,
        },
        inputViewFocus: {
            borderWidth: 1,
            borderColor: colors.primary4,
        },
        inputViewErrStyle: {
            borderWidth: 1,
            borderColor: 'tomato',
        },
        inputStyle: {
            color: colors.secondary1,
            flex: 1,
            fontFamily: fontFamily.regular,
            fontSize: 14,
        },
        //error and label
        txtErr: {
            color: "tomato",
            fontFamily: fontFamily.regular,
            fontSize: 12
        },
        txtLabel: {
            color: colors.primary1,
            fontFamily: fontFamily.regular,
            fontSize: 16,
            alignSelf: "flex-start"
        },
    });
});
export default styleSheet;






