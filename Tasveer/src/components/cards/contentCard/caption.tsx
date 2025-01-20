import React, { useState } from 'react';
import {
    View,
} from 'react-native';
import styleSheet from './styles/styles';
import { useStyles } from 'react-native-unistyles';
import { TextRegular } from '../../general/text/text';


type props = {
    text: string,
}

const Caption = ({
    text
}: props) => {


    const { styles, theme: { colors } } = useStyles(styleSheet)
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);


    return (
        <View>
            <TextRegular
                selectable
                numberOfLines={isExpanded ? undefined : 3}
                onPress={() => setIsExpanded(prev => !prev)}
                onTextLayout={(e) => {
                    if (e.nativeEvent.lines.length > 3) {
                        setShowSeeMore(true);
                    }
                }}
            >
                {text}
            </TextRegular>
            {
                showSeeMore && !isExpanded ?
                    <TextRegular style={{ color: colors.ternary1, marginBottom: 5 }}>
                        see more
                    </TextRegular>
                    :
                    null
            }
        </View>
    );
};

export default Caption;
