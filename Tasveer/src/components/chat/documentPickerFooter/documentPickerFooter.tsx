import React from 'react';
import { View } from 'react-native';
import styleSheet from './styles/styles';
import IconAnt from 'react-native-vector-icons/AntDesign';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { getDocumentIcon } from './documentIcons';
import { TextRegular } from '../../general/text/text';
import { useStyles } from 'react-native-unistyles';




type documentPickerFooterProps = {

    onClose?: () => void,
    document: string,
}
const DocumentPickerFooter = ({
    onClose,
    document,
}: documentPickerFooterProps) => {

    const { styles, theme: { colors } } = useStyles(styleSheet);
    const arr = document.split('.')
    return (
        <View style={styles.footerContainer}>


            {getDocumentIcon(arr[arr.length - 1])}
            <View style={{ flex: 1 }}>
                <TextRegular style={styles.txtStyle}
                    numberOfLines={1}
                    ellipsizeMode='middle'
                >
                    {document}
                </TextRegular>
            </View>
            {/* close image list button */}
            <ButtonRipple
                onPress={() => onClose && onClose()}
                style={styles.btnClose}
            >
                <IconAnt name="close" size={18} color={colors.secondary1} />
            </ButtonRipple>
        </View>
    );
};

export default DocumentPickerFooter;
