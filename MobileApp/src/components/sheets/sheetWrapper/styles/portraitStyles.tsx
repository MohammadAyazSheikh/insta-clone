
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';




type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {
    return StyleSheet.create({
        bgSheet: {
            backgroundColor: colors.primary3,
        },
        container: {
            flex: 1,
            width: '100%',
            alignItems: 'center',
        },
        scroll: {
            width: w(100),
        },
        handleIndStyle:{
            backgroundColor:colors.secondary1
        },
        menuContainer: {
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal:10,
            paddingVertical:15,
        },
        txtMenu:{
            fontSize:16,
            color:colors.secondary1,
        }
    });
}

export default portraitStyles;



