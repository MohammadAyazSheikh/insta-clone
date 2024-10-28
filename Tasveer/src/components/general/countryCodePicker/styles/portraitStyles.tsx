
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';


type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {


    return StyleSheet.create({
        backDrop: {
            ...StyleSheet.absoluteFill,
            backgroundColor: "black",
            opacity: 0.8
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        body: {
            backgroundColor: colors.primary3,
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: w(90),
            height: "70%"
        },
        headerView: {
            width: "100%",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.grey1,
        },
        contentView: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 10,
            flex:1,
            width: '90%',
        },
        scrollView: {
            width: '100%',
        },
        listStyle: {
            width: '100%',
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        }
    });
}

export default portraitStyles;



