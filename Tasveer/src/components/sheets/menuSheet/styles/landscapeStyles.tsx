
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';


type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
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

export default landscapeStyles;



