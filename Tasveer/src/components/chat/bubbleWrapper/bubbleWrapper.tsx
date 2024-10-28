import React from 'react';
import { ColorValue, View } from 'react-native';
import responsiveStyles from './styles/styles';
import { TextRegular } from '../../../components/general/text/text';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { messageObjType } from '../../../constants/types/sharedTypes';
import IconIo from 'react-native-vector-icons/Ionicons';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import colors from '../../../theme/colors';
import ReplyMessageFooter from '../replyFooter/replyMessageFooter';
import { chatScrollRef, refReactionSheet } from '../../../screens/conversationScreen/conversationScreen';
import { updateMessage } from '../../../redux/features/chat/chatSlice';
import { setSelectedMsgs, setSelectedReaction } from '../../../redux/features/ui/uiSlice';
import { showReaction } from '../reactions/reactions';
import { Text } from 'react-native';

const getMsgStatusIcon = (name: 'sent' | 'delivered' | 'seen' | 'sending',
    color?: number | ColorValue | undefined) => {
    const _color = color || colors.grey1
    const icons = {
        sent: <IconIo
            name="checkmark-sharp"
            color={_color}
            size={18}
        />,
        delivered: <IconIo
            name="checkmark-done-sharp"
            color={_color}
            size={18}
        />,
        seen: <IconIo
            name="checkmark-done-sharp"
            color={"#7DB0D4"}
            size={18}
        />,
        sending: <IconMtc
            name="clock-time-four-outline"
            color={_color}
            size={14}
        />
    }
    return (icons[name])
}

type bubbleWrapperType = {
    children?: React.ReactNode,
    onPress?: () => void,
    onLongPress?: () => void,
} & messageObjType

export default function BubbleWrapper({
    children,
    onPress,
    onLongPress,
    ...props
}: bubbleWrapperType) {

    const dispatch = useAppDispatch();
    const { user: sender, text, replyMessage, starred } = props;
    const { messages } = useAppSelector(state => state.chat);
    const { selectedMessages } = useAppSelector(state => state.ui);
    const { user } = useAppSelector(state => state.user);
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";
    const { styles } = useFunctionalOrientation(responsiveStyles);
    const you = sender?.id == user?.id;

    //scroll to message
    const scrollToMessage = () => {
        const replyIndex =
            messages.findIndex(msg => msg.id == replyMessage?.id);

        if (replyIndex == -1)
            return;

        chatScrollRef?.current &&
            chatScrollRef?.current?.scrollToIndex({
                animated: true,
                index: replyIndex,
            });
    }


    //user's reaction
    const msgReacts = props?.reacts;
    const userReaction = msgReacts?.find(r => {
        return r?.user?.id == user?.id
    });
    //reaction handler
    const onReaction = (selected: string) => {


        let updatedReacts: any = [];

        //if user react message with new reaction 
        if (userReaction && userReaction?.values != selected) {
            updatedReacts = msgReacts?.map(r => {
                if (r?.user?.id == user?.id) {
                    return { ...r, values: selected }
                }
                else {
                    return r;
                }
            });
        }

        //if user un-react the message  
        if (userReaction && userReaction?.values == selected) {
            updatedReacts = msgReacts?.filter(r =>
                r?.user?.id != user?.id);
        }

        //else push the new reaction
        if (!userReaction) {
            updatedReacts = [...msgReacts, { user: user, values: selected }]
        }


        // updating store
        dispatch(updateMessage({
            message: { ...props, reacts: updatedReacts },
            id: props?.id
        }));

    }

    return (
        <View style={styles.bubbleContainer}>
            <ButtonRipple
                onLongPress={() => {
                    //  select message only 1st time on long press
                    selectedMessages.length < 1 &&
                        dispatch(setSelectedMsgs(props));
                    //  showing reaction
                    showReaction({
                        onSelect: onReaction,
                        selected: userReaction?.values!
                    })
                    onLongPress && onLongPress()
                }}
                onPress={() => {

                    // select message on press only
                    // when the 1st msg has been selected
                    selectedMessages.length > 0 &&
                        dispatch(setSelectedMsgs(props));

                    // if reply go the replied message
                    if (replyMessage) {
                        scrollToMessage()
                    }
                    onPress && onPress()
                }}
                style={[
                    styles.messageView,
                    you && styles.messageViewSender
                ]}
            >
                {/* render child ie. video,voice,image,doc */}
                {
                    children
                }
                {
                    //---- if user replies ----
                    replyMessage && <ReplyMessageFooter
                        message={replyMessage}
                    />
                }
                {
                    // ----text message----
                    props.text ?
                        <TextRegular
                            style={[
                                styles.msgText,
                                (you && !isDark) && styles.msgTextSenderLight,
                            ]}
                        >
                            {
                                text
                            }
                        </TextRegular>
                        :
                        null
                }
                {/* ---- message info row ----- */}
                <View style={styles.row}>
                    {/* stared */}
                    {starred ? <IconAnt
                        name='star'
                        size={10}
                        color={colors.primary4}
                        style={{ marginHorizontal: 5 }}
                    /> :
                        null
                    }
                    {/* sent time */}
                    <TextRegular style={[
                        styles.txtTime,
                        (you && !isDark) && styles.msgTextSenderLight,
                    ]}>
                        1h ago
                    </TextRegular>
                    {/* status icon */}
                    {
                        you ? getMsgStatusIcon(props.status,colors.primary4) : null
                    }
                </View>
            </ButtonRipple>

            {/* reaction */}
            {
                msgReacts?.length > 0 ?
                    <ButtonRipple style={styles.reaction}
                        onPress={() => {
                            dispatch(setSelectedReaction(msgReacts));
                            refReactionSheet.current?.expand()
                        }}
                    >
                        <Text
                            adjustsFontSizeToFit
                            style={{ fontSize: 15, color: colors.ternary1 }}>
                            {
                                msgReacts?.slice(0, 3)?.map(r => (
                                    r.values
                                ))
                            }
                            {
                                (msgReacts?.length > 3) ? ' 3+' : null
                            }
                        </Text>
                    </ButtonRipple>
                    :
                    null
            }
        </View>
    );
}

