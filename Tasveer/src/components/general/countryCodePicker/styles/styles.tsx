import { StyleSheet } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';
import { widthToDp as w } from '../../../../utils/functions/responsiveUtils';


const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing } = theme;
    return ({
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
            height: "50%"
        },
        headerView: {
            width: "100%",
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.lg,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.common.grey1,
        },
        contentView: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: spacing.lg,
            flex: 1,
            width: '90%',
        },
        scrollView: {
            width: '100%',
        },
        listStyle: {
            width: '100%',
            paddingVertical: spacing.lg,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        }
    })
});

export default styleSheet;