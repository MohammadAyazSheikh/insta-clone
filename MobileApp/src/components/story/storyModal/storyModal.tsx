import React from 'react';
import {
    Modal, ActivityIndicator, TextProps,
    ActivityIndicatorProps, ViewProps, View
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { Text } from 'react-native-paper';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';




 const StoryModal = ({


}) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();

    return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                <View
                    style={styles.backDrop}
                />
                <View
                    style={styles.centeredView}
                >
                   
                </View>
            </Modal >
    );
};
export default StoryModal;