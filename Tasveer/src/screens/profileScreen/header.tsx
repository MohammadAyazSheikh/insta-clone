import React, { } from 'react';
import ButtonRipple from '../../components/general/customButton/buttonRipple';
import { FlatList, View } from 'react-native';
import { commonStyles } from '../../theme/common';
import { TextBold, TextRegular } from '../../components/general/text/text';
import { formatNumber } from '../../utils/formaters/numbers';
import StoryAvatar from '../../components/story/storyAvatar/storyAvatar';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';
import { widthToDp as w } from '../../utils/functions/responsiveUtils';


export default function ProfileHeader() {

    const { styles, theme: { spacing } } = useStyles(styleSheet);
    // const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    // const { user } = useAppSelector(state => state.user);
    // const dispatch = useAppDispatch();

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
                    numberOfArch={1}
                    showNumberOfArch={0}
                    radius={w(12)}
                    showAddIcon
                />
                {/* info */}
                <View style={styles.userInfoTextRow}>
                    <ButtonRipple onPress={() => ""} style={commonStyles.colCenter}>
                        <TextBold style={styles.txtInfoVal}>
                            {formatNumber(78)}
                        </TextBold>
                        <TextRegular style={styles.txtInfoLabel}>
                            Posts
                        </TextRegular>
                    </ButtonRipple>
                    <ButtonRipple onPress={() => ""} style={commonStyles.colCenter}>
                        <TextBold style={styles.txtInfoVal}>
                            {formatNumber(5764608)}
                        </TextBold>
                        <TextRegular style={styles.txtInfoLabel}>
                            Followers
                        </TextRegular>
                    </ButtonRipple>
                    <ButtonRipple onPress={() => ""} style={commonStyles.colCenter}>
                        <TextBold style={styles.txtInfoVal}>
                            {formatNumber(2376)}
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
                    John Doe
                </TextBold>
                <TextRegular style={styles.txtName}>
                    Do more things that make you forget to check your phone.
                </TextRegular>
            </View>
            {/* follow and message button */}
            {/* <View style={commonStyles.rowCenter}>
                <ButtonRipple style={[styles.btnEdit, { backgroundColor: colors.ternary1, width: 'auto', flex: 1 }]}>
                    <TextBold style={[styles.txtName, { color: 'white' }]}>
                        Follow
                    </TextBold>
                </ButtonRipple>
                <ButtonRipple style={[styles.btnEdit, { marginLeft: 10, width: 'auto', flex: 1 }]}>
                    <TextBold style={[styles.txtName]}>
                        Message
                    </TextBold>
                </ButtonRipple>
            </View> */}
            {/* edit button */}
            <ButtonRipple style={styles.btnEdit}>
                <TextBold style={styles.txtName}>
                    Edit Profile
                </TextBold>
            </ButtonRipple>
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