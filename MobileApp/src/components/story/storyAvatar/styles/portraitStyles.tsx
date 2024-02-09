
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';

type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.primary1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        scroll: {
            width: w(100),
            alignItems: 'center',
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        // header 
        headerView: {
            width: "100%",
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        logoStyles: {
            width: w(35),
            resizeMode: 'contain',
        },
        // story
        storyView: {
            width: w(25),
            aspectRatio: 1,
            borderRadius: w(30),
            justifyContent: 'center',
            alignItems: 'center',
            padding:3,
        },
        storyImageView: {
            width: '100%',
            aspectRatio: 1,
            borderRadius: w(30),
            backgroundColor: colors.primary1,
            borderWidth: 3,
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

export default portraitStyles;



