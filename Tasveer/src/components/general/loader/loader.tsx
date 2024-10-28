import React from 'react';
import {
    Modal, ActivityIndicator, TextProps,
    ActivityIndicatorProps, ViewProps, View
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { Text } from 'react-native-paper';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';



type loaderType = {
    showLoader: boolean,
    loaderProps?: ActivityIndicatorProps,
    centerViewProps?: ViewProps,
    modalViewProps?: ViewProps,
    backDropProps?: ViewProps,
    loadingTextProps?: TextProps,
    loadingText?: string,
}

const Loader = ({
    showLoader,
    loaderProps,
    centerViewProps,
    modalViewProps,
    backDropProps,
    loadingTextProps,
    loadingText = "Loading...",

}: loaderType) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showLoader}
        >
            <View
                style={styles.backDrop}
                {...backDropProps}
            />
            <View
                style={styles.centeredView}
                {...centerViewProps}
            >
                <View
                    style={styles.modalView}
                    {...modalViewProps}
                >
                    <ActivityIndicator
                        color={colors.secondary1}
                        size={"large"}
                        {...loaderProps}
                    />
                    {loadingText && < Text
                        style={styles.txtLoading}
                        allowFontScaling={false}
                    >
                        {loadingText}
                    </Text>}
                </View>
            </View>
        </Modal >
    );
};
export default Loader;