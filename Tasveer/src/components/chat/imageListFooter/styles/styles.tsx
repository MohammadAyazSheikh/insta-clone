import { createStyleSheet } from "react-native-unistyles";
import { heightToDp as h } from "../../../../utils/functions/responsiveUtils";

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing,fontSize } = theme;
    return ({
       
         // =====================Image list footer styles==================
         imageFooterContainer: {
            width: '100%',
            paddingVertical:spacing?.md,
            backgroundColor: colors.primary1,
            justifyContent: 'center',
        },
        footerImageView: {
            height: h(12),
            aspectRatio: 1,
            backgroundColor: 'white',
            marginHorizontal: spacing?.md,
        },
        imgFooterStyle: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        btnRemoveSingleImg: {
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: colors.secondary1,
            position: 'absolute',
            left: 5,
            top: 5,
        },
        btnCloseImgList: {
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: "tomato",
            position: 'absolute',
            right: 5,
            top: 5,
        },
    })
});

export default styleSheet;