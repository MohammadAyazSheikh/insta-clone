import React from 'react';
import {
    View,
} from 'react-native';
import ButtonRipple from '../../general/customButton/buttonRipple';
import UserAvatar from '../../general/avatar/avatar';
import { TextBold, TextRegular } from '../../general/text/text';
import { useStyles } from 'react-native-unistyles';
import styleSheet from '../inboxCard/styles/styles';



type cardProps = {
    onPress?: () => void,
    title: string,
    avatar?: string,
    subTitle?: string,
}

const UserCard = ({
    title,
    subTitle,
    avatar,
    onPress,
}: cardProps) => {


    const { styles, theme: { colors } } = useStyles(styleSheet);

    return (
        <ButtonRipple style={styles.container}
            onPress={onPress && onPress}
        >
            {/* avatar */}
            <UserAvatar
                name={title}
                image={avatar ? { uri: avatar } : null}
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
        </ButtonRipple>
    );
};

export default UserCard;
