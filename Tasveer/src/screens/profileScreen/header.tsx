import React, { useState } from 'react';
import ButtonRipple from '../../components/general/customButton/buttonRipple';
import { FlatList, View } from 'react-native';
import { commonStyles } from '../../theme/common';
import { TextBold, TextRegular } from '../../components/general/text/text';
import { formatNumber } from '../../utils/formaters/numbers';
import StoryAvatar from '../../components/story/storyAvatar/storyAvatar';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';
import { widthToDp as w } from '../../utils/functions/responsiveUtils';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { useAppSelector } from '../../redux/hooks';
import { userType } from '../../constants/types/sharedTypes';

type props = {
    user: userType,
    totalPosts?: number,
    totalFollowers?: number,
    totalFollowing?: number,
}

export default function ProfileHeader({
    user,
    totalFollowers = 7213,
    totalFollowing = 3228,
    totalPosts = 123
}: props) {



    const { styles, theme: { spacing, colors } } = useStyles(styleSheet);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const { user: loggedInUser } = useAppSelector(state => state.user);


    const isLoggedInUser = loggedInUser?.id === user.id;

    const [followed, setFollowed] = useState(false);


    const renderHighlights = () => (
        <FlatList
            showsHorizontalScrollIndicator={false}
            style={{ width: w(100), paddingVertical: spacing?.lg }}
            data={heightData}
            horizontal
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (<StoryAvatar
                numberOfArch={1}
                showNumberOfArch={0}
                radius={w(10)}
                name={item.title}
            />)}
        />
    )

    return (

        <View style={styles.topView}>
            <View style={styles.userInfoRow}>
                {/* avatar */}
                <StoryAvatar
                    hideName
                    name={user?.firstName}
                    image={user?.profileImage ? { uri: user?.profileImage } : null}
                    numberOfArch={1}
                    showNumberOfArch={0}
                    radius={w(12)}
                    showAddIcon={isLoggedInUser}
                />
                {/* info */}
                <View style={styles.userInfoTextRow}>
                    <ButtonRipple onPress={() => ""} style={commonStyles.colCenter}>
                        <TextBold style={styles.txtInfoVal}>
                            {formatNumber(totalPosts)}
                        </TextBold>
                        <TextRegular style={styles.txtInfoLabel}>
                            Posts
                        </TextRegular>
                    </ButtonRipple>
                    <ButtonRipple onPress={() => ""} style={commonStyles.colCenter}>
                        <TextBold style={styles.txtInfoVal}>
                            {formatNumber(totalFollowers)}
                        </TextBold>
                        <TextRegular style={styles.txtInfoLabel}>
                            Followers
                        </TextRegular>
                    </ButtonRipple>
                    <ButtonRipple onPress={() => ""} style={commonStyles.colCenter}>
                        <TextBold style={styles.txtInfoVal}>
                            {formatNumber(totalFollowing)}
                        </TextBold>
                        <TextRegular style={styles.txtInfoLabel}>
                            Following
                        </TextRegular>
                    </ButtonRipple>
                </View>
            </View>
            {/* about and name */}
            <View style={{ width: '100%', marginBottom: spacing?.lg, }}>
                <TextBold style={styles.txtName}>
                    {user.userName}
                </TextBold>
                {
                    user?.bio ? <TextRegular style={styles.txtName}>
                        {user?.bio}
                    </TextRegular>
                        :
                        null
                }
            </View>
            {
                // follow and message button
                !isLoggedInUser ?
                    <View style={commonStyles.rowCenter}>
                        <ButtonRipple style={[styles.btnEdit, { backgroundColor: colors.ternary1, width: 'auto', flex: 1 }]}
                            onPress={() => setFollowed(!followed)}
                        >
                            <TextBold style={[styles.txtName, { color: 'white' }]}>
                                {followed ? "Unfollow" : "Follow"}
                            </TextBold>
                        </ButtonRipple>
                        <ButtonRipple style={[styles.btnEdit, { marginLeft: 10, width: 'auto', flex: 1 }]}
                            onPress={() => navigation.navigate("Conversation", { recipient: user })}
                        >
                            <TextBold style={[styles.txtName]}>
                                Message
                            </TextBold>
                        </ButtonRipple>
                    </View>
                    :
                    // edit button 
                    <ButtonRipple
                        style={styles.btnEdit}
                        onPress={() => {
                            navigation.navigate("EditProfile");
                        }}
                    >
                        <TextBold style={styles.txtName}>
                            Edit Profile
                        </TextBold>
                    </ButtonRipple>
            }
            {/* ----Highlight---- */}
            {renderHighlights()}
        </View>
    );
}




const heightData = [
    {
        id: 1,
        title: "Tour 2024",
        image: null,
    },
    {
        id: 2,
        title: "Isl Hiking",
        image: null,
    },
    {
        id: 3,
        title: "My birthdays",
        image: null,
    },
    {
        id: 344,
        title: "Treat 🍔",
        image: null,
    },
    {
        id: 4,
        title: "Food",
        image: null,
    },
    {
        id: 5,
        title: "Trip",
        image: null,
    }
]