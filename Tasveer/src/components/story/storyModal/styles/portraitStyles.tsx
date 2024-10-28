
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';



type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {


    return StyleSheet.create({
        centeredView: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            width: w(100),
            height: "100%",
            flex:1,
            transform: [
                { perspective: 1000 },
            ],

        },
        scroll: {
            width: w(100),
        },
        container: {
            width: w(100),
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary1,
            paddingVertical: 5,
            // borderWidth: 1,
            // borderColor: 'red',
            transformOrigin: "center"
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: w(100),
            paddingHorizontal: 10,
        },
        col: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        // content
        contentContainer: {
            flex: 1,
            width: '100%',
        },
        imgContent: {
            flex: 1,
            width: '100%',
            resizeMode: 'contain',
        },
        btnStory: {
            height: '100%',
            width: '50%',
            position: 'absolute',
        },
        btnStoryLeft: {
            top: 0,
            left: 0
        },
        btnStoryRight: {
            top: 0,
            right: 0,
        
        },
        // footer
        txtInput: {
            flex: 1,
            height:h(5),
            borderColor: colors.grey1,
            borderWidth: 1,
            borderRadius: 100,
            paddingHorizontal: 10,
            color: colors.secondary1,
        },
        btnStyles: {
            borderRadius: 1000,
            padding: 2,
            marginLeft: 10,
        },
    });
}

export default portraitStyles;



