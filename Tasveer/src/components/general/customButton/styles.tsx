import { StyleSheet } from 'react-native-unistyles';
import { fontFamily } from '../../../theme/fonts';

const styles = StyleSheet.create((theme) => {
    const { colors } = theme;

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
        disableStyle: {
            backgroundColor: colors.ternary2,
        },
        txtBtn: {
            color: "#fff",
            fontFamily: fontFamily.bold,
            fontSize: 14
        }
    })
});

export default styles;





