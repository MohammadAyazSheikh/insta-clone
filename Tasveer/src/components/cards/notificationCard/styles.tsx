import { createStyleSheet } from "react-native-unistyles";
import { widthToDp as w } from "../../../utils/functions/responsiveUtils";


const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing, fontSize } = theme;
    return ({
        container: {
            width: "95%",
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.primary1,
            paddingVertical: spacing?.xxl
        },
        centerView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: spacing?.lg
        },
        avatarView: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        multiAvatarView: {
            width: 40,
            height: 40
        },
        bottomAvatar: { position: 'absolute', bottom: "-30%", right: "-30%" },
        textView: {
            justifyContent: 'center',
            flex: 1
        },
        txtTitle: {
            color: colors.secondary1,
            fontSize: fontSize.lg
        },
        txtSubTitle: {
            color: colors.secondary1,
            fontSize: fontSize.md
        },
        txtTime: {
            color: colors.common?.grey1,
            fontSize: fontSize?.sm,
        },
        sideView: {
            paddingLeft: spacing?.md,
            height: '100%',
        },
        followBtn: {
            height: "auto",
            width: "auto",
            paddingVertical: 7,
            paddingHorizontal: 20
        },
    })
});

export default styleSheet;