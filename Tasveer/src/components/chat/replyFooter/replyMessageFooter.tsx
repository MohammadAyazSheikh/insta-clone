import React from 'react';
import { View } from 'react-native';
import styleSheet from './styles/styles';
import IconAnt from '@expo/vector-icons/AntDesign';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { messageObjType } from '../../../constants/types/sharedTypes';
import { colorsList } from '../../../theme/colors';
import { TextBold, TextRegular } from '../../general/text/text';
import { getMessageIcon } from './messageIcon';
import { useAppSelector } from '../../../redux/hooks';
import { useStyles } from 'react-native-unistyles';



type replyFooterProps = {
    message: messageObjType
    onClose?: () => void,
}
const ReplyMessageFooter = ({
    message,
    onClose,
}: replyFooterProps) => {
    const { styles, theme: { colors } } = useStyles(styleSheet);


    const { user } = useAppSelector(state => state.user);
    // const { theme } = useAppSelector(state => state.theme);
    // const isDark = theme == "dark";
    const { user: userInfo, type, text } = message;
    const you = user?.id == userInfo?.id;

    const stripColor = colorsList[userInfo?.firstName?.charCodeAt(0)! % colorsList.length];
    const messageIcon = getMessageIcon(type!, colors.ternary1);
    return (

        <View style={[
            styles.msgContainer
        ]}>
            {/* side strip */}
            <View style={[
                styles.leftStrip,
                stripColor && { backgroundColor: stripColor }
            ]} />
            <View style={styles.msgView}>
                {/* ---- user name ---- */}
                <View style={styles.wrapper}>
                    <TextBold
                        numberOfLines={1}
                        style={[styles.txtName, stripColor && { color: stripColor }]}
                    >
                        {
                            you ?
                                "You"
                                :
                                `${userInfo.firstName || ''} ${userInfo.lastName || ''}`
                        }
                    </TextBold>
                </View>

                {
                    // ---- message ----
                    type == 'text' ?
                        < View style={styles.wrapper}>
                            <TextRegular
                                style={[styles.txtMsg]}
                                numberOfLines={3}
                            >
                                {text}
                            </TextRegular>
                        </View>
                        :
                        //  ---- if other type of message ---- 
                        < View style={styles.wrapper}>
                            {/* icon */}
                            {messageIcon?.icon}
                            {/* text */}
                            <TextRegular
                                style={[styles.txtMsg]}
                                numberOfLines={3}
                            >
                                {
                                    `  ${messageIcon.text}`
                                }
                            </TextRegular>

                        </View>
                }
            </View>
            {/* close  button */}
            {onClose && <ButtonRipple
                onPress={() => onClose && onClose()}
                style={styles.btnClose}
            >
                <IconAnt name="close" size={18} color={colors.ternary1} />
            </ButtonRipple>}
        </View>

    );
};

export default ReplyMessageFooter;
