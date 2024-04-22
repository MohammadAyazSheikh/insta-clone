import React from 'react';
import {
    View,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import ButtonRipple from '../../general/customButton/buttonRipple';
import UserAvatar from '../../general/avatar/avatar';
import { TextBold, TextRegular } from '../../general/text/text';
import { Badge } from 'react-native-paper';
import moment from 'moment';



type cardProps = {
    onPress?: () => void,
    badge?: number,
    title: string,
    time?: string,
    avatar?: string,
    subTitle?: string,
}

const InboxCard = ({
    title,
    subTitle,
    badge,
    time,
    avatar,
    onPress,
}: cardProps) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();


    return (
        <ButtonRipple style={styles.container}>
            {/* avatar */}
            <UserAvatar
                name={title}
            />
            {/* center view */}
            <View style={styles.centerView}>
                <TextBold style={styles.txtTitle}>
                    {title}
                </TextBold>
                {
                    <TextRegular style={styles.txtSubTitle}>
                        {subTitle}
                    </TextRegular>
                }
            </View>
            {/* badge and time */}
            <View style={styles.sideView}>
                {
                    time ?
                        <TextRegular style={styles.txtTime}>
                            {moment(time).fromNow()}
                        </TextRegular> :
                        null
                }
                {
                    badge ?
                        <Badge style={{ backgroundColor: colors.ternary1 }}>
                            2
                        </Badge>
                        :
                        null
                }
            </View>
        </ButtonRipple>
    );
};

export default InboxCard;
