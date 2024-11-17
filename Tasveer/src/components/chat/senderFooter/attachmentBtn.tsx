import React from 'react';
import { View } from 'react-native';
import styleSheet from './styles/styles';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { TextRegular } from '../../general/text/text';
import { useStyles } from 'react-native-unistyles';

type attachBtnProps = {
    onPress?: () => void,
    name: string,
    icon: React.ReactNode,
    backgroundColor?: string
}


const AttachmentButton = ({ onPress, icon, name, backgroundColor }: attachBtnProps) => {

    const { styles } = useStyles(styleSheet);
    
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ButtonRipple
                onPress={onPress}
                style={[[styles.attachBtn, backgroundColor && { backgroundColor }]]}>
                {icon}
            </ButtonRipple >
            <TextRegular style={styles.txtBtnSheet}>
                {name}
            </TextRegular>
        </View>
    );
};

export default AttachmentButton;