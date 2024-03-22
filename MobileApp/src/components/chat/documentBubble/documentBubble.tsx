import React from 'react';
import { View } from 'react-native';
import responsiveStyles from './styles/styles';
import { TextItalic } from '../../../components/general/text/text';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import { useAppSelector } from '../../../redux/hooks';
import { getDocumentIcon } from '../documentPickerFooter/documentIcons';
import { messageObjType } from '../../../constants/types/sharedTypes';
import BubbleWrapper from '../bubbleWrapper/bubbleWrapper';

type propsType = {
    message: messageObjType,
    onPress?: () => void,
    onLongPress?: () => void,
}

export default function DocumentBubble(props: propsType) {

    const { user } = useAppSelector(state => state.user);
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";
    const { styles } = useFunctionalOrientation(responsiveStyles);

    const { message } = props;

    const {
        user: sender
    } = message;
    const you = sender?.id == user?.id;

    const ext = message?.document?.split('.');

    return (

        <BubbleWrapper {...message}
            onPress={props?.onPress}
            onLongPress={props.onLongPress}
        >
            <View style={styles.row}>
                {/* doc icon */}
                {ext && getDocumentIcon(ext[ext?.length - 1])}
                {/* doc name/uri */}
                <TextItalic
                    style={[
                        styles.msgText,
                        (you && !isDark) && styles.msgTextSenderLight,
                    ]}
                >
                    {
                        message?.document
                    }
                </TextItalic>
            </View>
        </BubbleWrapper>

    );
}

