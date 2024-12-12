import { StyleSheet } from 'react-native-unistyles';
import { heightToDp as h } from '../../../../utils/functions/responsiveUtils';
import { fontFamily } from '../../../../theme/fonts';

const styles = StyleSheet.create((theme) => {
    const { colors, spacing,fontSize } = theme;
    
    return ({
        container: {
            width: "100%",
            height: h(7),
            backgroundColor: colors.primary1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        centerView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        txtHeader: {
            color: colors.secondary1,
            fontSize: fontSize?.xl2,
            fontFamily: fontFamily.bold
        },
        btnLeftContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: "absolute",
            left: 5,
        },
        btnRightContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: "absolute",
            right: 5,
        },
        // ------------- Animated Search bar-------------
        viewSearchBar: {
            width: '100%',
            height: h(6),
            paddingVertical:spacing?.md,
            paddingHorizontal: spacing?.md,
           
        },
        searchBarContainer: {
            width: '100%',
            height: '100%',
            backgroundColor: colors.primary4,
            borderWidth: 0,
            borderRadius:1000,
            overflow: 'hidden'
        },
        inputViewStyles: {
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
            borderRadius: 0,
            borderWidth:0,
        },
    });
});
export default styles;
