
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';



type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        container: {
            width: w(100),
            height: 0,
            backgroundColor: colors.primary1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        video: {
            width: w(100),
            height: '100%',
            flex:1,
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
            fontSize: 14,
            marginHorizontal: 10,
        },
        btnFollow: {
            backgroundColor: 'transparent',
            width: 'auto',
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            height: 'auto',
            borderWidth: 1,
            borderColor: 'white'
            // borderColor: colors.secondary1
        },
        btnStyle: {
            marginVertical: 5,
            marginHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center'
        },
        txtStats: {
            color: 'white',
            // color:colors.secondary1,
            fontSize: 12,
        },
        cameraBtn: {
            position: 'absolute',
            top: 0,
            right: 0,
        },
        descView: {
            width: '100%',
            paddingRight: 20,
            paddingLeft: 5,
            paddingVertical: 5,
        },
        txtDescription: {
            color: 'white',
            // color: colors.secondary1,
            fontSize: 14
        },
    });
}

export default portraitStyles;



