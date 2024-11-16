import { createStyleSheet } from 'react-native-unistyles';

const styleSheet = createStyleSheet((theme) => {

    return ({
        container: {
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 5,
        },
        row: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignSelf: 'flex-start'
        },
        btnStyle: {
            marginHorizontal: 5
        }
    })
});

export default styleSheet;

