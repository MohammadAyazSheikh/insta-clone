import React from 'react';
import {
    View,
} from 'react-native';
import styleSheet from './styles/styles';
// import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { TextRegular } from '../../general/text/text';
import { reactionType } from '../../../constants/types/sharedTypes';
import { useAppSelector } from '../../../redux/hooks';
import UserAvatar from '../../general/avatar/avatar';
import { useStyles } from 'react-native-unistyles';





const UserReaction = ({
    user,
    values,
}: reactionType) => {

    const { styles } = useStyles(styleSheet)
    const { user: user_ } = useAppSelector(state => state.user);


    return (
        <ButtonRipple style={styles.row}
            onPress={() => { }}
        >
            <View style={[styles.rowUser]}>
                {/* avatar */}
                <UserAvatar
                    size={40}
                    image={user?.profileImage}
                />
                {/* name */}
                <TextRegular style={styles.txtName}>
                    {
                        user_?.id == user?.id ?
                            'You'
                            :
                            user?.userName || user?.firstName
                    }
                </TextRegular>
            </View>
            {/* reaction */}
            <TextRegular style={{ color: 'white', fontSize: 20 }}>
                {values}
            </TextRegular>
        </ButtonRipple>
    );
}

export default UserReaction;
