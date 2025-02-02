import { createStyleSheet } from 'react-native-unistyles';
import { widthToDp as w } from '../../../../utils/functions/responsiveUtils';

const styleSheet = createStyleSheet((theme) => {
    const { colors, fontSize, spacing } = theme;

    return ({
        container: {
            width: w(100),
            height: "100%",
            backgroundColor: colors.primary1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        video: {
            width: w(100),
            height: '100%',
            flex: 1,
            backgroundColor: 'black'
        },
        row: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            position: 'absolute',
            bottom: 0,
            left: 0
        },
        rowCover: {
            height: '100%',
            backgroundColor: 'rgba(128,128,128,0.1)'
        },
        col: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        infoView: {
            flex: 1,
            justifyContent: 'flex-end',

        },
        userInfoView: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        txtName: {
            color: 'white',
            // color: colors.secondary1,
            fontSize: fontSize.md,
            marginHorizontal: 10,
        },
        btnFollow: {
            backgroundColor: 'transparent',
            width: 'auto',
            borderRadius: spacing?.lg,
            paddingHorizontal: spacing?.lg,
            paddingVertical: spacing?.lg,
            height: 'auto',
            borderWidth: 1,
            borderColor: 'white'
            // borderColor: colors.secondary1
        },
        btnStyle: {
            marginVertical: spacing?.md,
            marginHorizontal: spacing?.md,
            justifyContent: 'center',
            alignItems: 'center'
        },
        txtStats: {
            color: 'white',
            // color:colors.secondary1,
            fontSize: fontSize?.sm,
        },
        cameraBtn: {
            position: 'absolute',
            top: 0,
            right: 0,
        },
        descView: {
            width: '100%',
            paddingRight: spacing?.xxl,
            paddingLeft: spacing?.md,
            paddingVertical: spacing?.md,
        },
        txtDescription: {
            color: colors.secondary1,
            fontSize: fontSize?.md
        },
    });
});

export default styleSheet;