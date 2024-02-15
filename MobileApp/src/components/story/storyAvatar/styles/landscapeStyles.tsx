
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';


type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors :colorObjectType) => {

    return StyleSheet.create({
        storyView: {
            width: w(25),
            aspectRatio: 1,
            borderRadius: w(30),
            justifyContent: 'center',
            alignItems: 'center',
            padding:2,
        },
        storyImageView: {
            width: '100%',
            aspectRatio: 1,
            borderRadius: w(30),
            backgroundColor: colors.primary1,
            borderWidth: 0.5,
            borderColor: colors.primary1,
        },
        imgStory:{
            width:'100%',
            height:'100%',
            borderRadius: w(30),
            resizeMode:'cover',
        },
    });
}

export default landscapeStyles;



