import React from 'react';
import {
    View,
} from 'react-native';
import ButtonRipple from '../../general/customButton/buttonRipple';
import UserAvatar from '../../general/avatar/avatar';
import { TextBold, TextRegular } from '../../general/text/text';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles';
import CustomButton from '../../general/customButton/customButton';
import { userType } from '../../../constants/types/sharedTypes';



type cardProps = {
    onPress?: () => void,
    title: string,
    avatar?: string,
    subTitle?: string,
    time?: string,
    type: "FollowRequest" | "FriendSuggestion" | "AcceptRequest" | "Like" | "Comment"
    users: userType[]
}

const NotificationsCard = ({
    title,
    subTitle,
    time = '1h',
    avatar,
    type,
    users = [],
    onPress,
}: cardProps) => {


    const { styles } = useStyles(styleSheet);

    const isMultiAvatar = users.length > 1;


    return (
        <ButtonRipple style={styles.container}
            onPress={onPress && onPress}
        >
            {/* avatar */}
            <View style={[styles.avatarView, isMultiAvatar && { marginRight: 10 }]}>
                <UserAvatar
                    image={{ uri: users[0]?.profileImage }}
                    showRing
                    size={isMultiAvatar ? 35 : 50}
                />
                {
                    isMultiAvatar ?
                        <UserAvatar
                            image={{ uri: users[1]?.profileImage }}
                            showRing
                            size={35}
                            containerStyle={styles.bottomAvatar}
                        />
                        :
                        null
                }
            </View>
            {/* center view */}
            <View style={styles.centerView}>
                <View style={styles.textView}>
                    <TextBold style={styles.txtTitle}>
                        {title}
                        <TextRegular style={styles.txtSubTitle}>
                            {` ${subTitle}`}
                        </TextRegular>
                        <TextRegular style={styles.txtTime}>
                            {` ${time}`}
                        </TextRegular>
                    </TextBold>
                </View>
            </View>
            {
                (type === "FollowRequest" || type === "AcceptRequest" || type === "FriendSuggestion") ?
                    <View style={styles.sideView}>
                        <CustomButton
                            style={styles.followBtn}
                            outlined={type === "AcceptRequest"}
                            buttonText={type === "FollowRequest" || type === "FriendSuggestion" ? "Follow" : "Following"}
                        />
                    </View>
                    :
                    null
            }
        </ButtonRipple>
    );
};

export default NotificationsCard;
