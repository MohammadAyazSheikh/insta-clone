import { createStyleSheet } from "react-native-unistyles";

const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing,fontSize } = theme;
    return ({
       
        // -------------------image stack styles----------------
        imageListView: {
            flexDirection: 'row',
            position: 'relative',
            // backgroundColor: 'red',
        },
        imageListItemView: {
            aspectRatio: 1,
            backgroundColor: 'white',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: spacing?.md,
        },
        imgChatMulti: {
            width: '97%',
            height: '97%',
            borderRadius: spacing?.md,
        },
        lastImageBoxStyle: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: spacing?.md,
        },
        lastImageBoxOverlay: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0,0.7)',
            borderRadius: spacing?.md,
            position: 'absolute',
            top: 0,
            left: 0,
        },
        txtMoreImage: {
            color: colors.ternary1,
            fontSize: fontSize?.lg,
        },
    })
});

export default styleSheet;