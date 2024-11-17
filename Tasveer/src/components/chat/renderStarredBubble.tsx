
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import TextBubble from './textBubble/textBubble';
import ImageBubble from './imageBubble/imageBubble';
import SoundBubble from './soudBubble/soundBubble';
import DocumentBubble from './documentBubble/documentBubble';
import { messageObjType } from '../../constants/types/sharedTypes';
import { widthToDp as w } from '../../utils/functions/responsiveUtils';
import VideoBubble from './videoBubble/videoBubble';
import IconAnt from 'react-native-vector-icons/AntDesign';
import LocationBubble from './locationBubble/locationBubble';
import { TextBold } from '../general/text/text';
import colors from '../../theme/colors';
import ButtonRipple from '../general/customButton/buttonRipple';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import UserAvatar from '../general/avatar/avatar';
import { createStyleSheet, useStyles } from 'react-native-unistyles';




type props = {
    message: messageObjType,

}
export const RenderStarredBubble = (props: props) => {

    const { styles } = useStyles(styleSheet);

    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const { user } = useAppSelector(state => state.user);
    const { message } = props;
    const {
        type,
        user: sender
    } = message;
    const you = sender?.id == user?.id;


    return (

        <ButtonRipple style={[styles.rootContainer,]}
            onPress={() => {
                navigation.navigate('Conversation', { messageId: message.id })
            }}
        >
            {/* message info row */}
            <View style={styles.starredMsgInfoRow}>
                {/* user name */}
                <View style={styles.row}>
                    <UserAvatar
                        size={25}
                        name='T'
                    />
                    <TextBold style={styles.txtName}>
                        {`You ▶ Sami`}
                    </TextBold>
                </View>
                {/* starred date */}
                <View style={styles.row}>
                    <TextBold style={[styles.txtName, { fontSize: 12 }]}>
                        {'2/17/2060'}
                    </TextBold>
                    <IconAnt
                        name='right'
                        size={12}
                        color={colors.grey1}
                    />
                </View>
            </View>
            {/* message bubble */}
            <View style={[styles.bubbleContainer]}>

                {/* if text */}
                {
                    type == "text" ?
                        <TextBubble
                            message={message}
                        />
                        :
                        null
                }
                {/* if image */}
                {

                    type == "image" ?
                        <ImageBubble
                            message={message}
                        />
                        :
                        null
                }
                {/* if voice */}
                {

                    type == "voice" ?
                        <SoundBubble
                            message={message}
                        />
                        :
                        null
                }
                {/* if document */}
                {

                    type == "document" ?
                        <DocumentBubble
                            message={message}
                        />
                        :
                        null
                }
                {/* if video */}
                {

                    type == "video" ?
                        <VideoBubble
                            message={message}
                        />
                        :
                        null
                }
                {/* if video */}
                {

                    type == "location" ?
                        <LocationBubble
                            message={message}
                        />
                        :
                        null
                }
            </View>
        </ ButtonRipple >
    )
};


const styleSheet = createStyleSheet((theme) => {
    const { colors, spacing } = theme;
    return ({
        rootContainer: {
            width: w(100),
            paddingHorizontal: spacing?.md,
        },
        bubbleContainer: {
            width: w(100),
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            paddingRight: spacing?.md,
            paddingVertical: spacing?.lg,
            paddingLeft: '10%'
        },
        starredMsgInfoRow: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: spacing?.xl,
            borderTopWidth: 0.25,
            borderTopColor: colors.common?.grey1
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        txtName: {
            color: colors?.common?.grey1
        },
    })
})