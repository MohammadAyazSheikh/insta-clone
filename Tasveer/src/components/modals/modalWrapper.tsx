import { BlurView } from 'expo-blur';
import React from 'react';
import { Modal, View, ModalProps, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';



type modalProps = {
    children: React.ReactNode,
    showBackDrop?: boolean,
    backDropStyles?: ViewStyle,
    containerStyles?: ViewStyle,
    onBackdropPress?: () => void,
} & ModalProps

const ModalWrapper = ({
    children,
    showBackDrop = true,
    backDropStyles = {},
    containerStyles,
    onBackdropPress,
    ...rest }: modalProps) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            {...rest}
        >
            {/* backdrop */}
            {showBackDrop && <TouchableOpacity
                disabled={!onBackdropPress}
                activeOpacity={0.9}
                onPress={onBackdropPress}
                style={[
                    {
                        ...StyleSheet.absoluteFillObject,
                        // backgroundColor:'white',
                        // filter:"opacity(0%)
                        // filter: opacity(25%);"
                    },
                    backDropStyles,
                ]}

            >
                <BlurView intensity={40} tint="dark" style={{...StyleSheet.absoluteFillObject}} experimentalBlurMethod='dimezisBlurView' />
            </TouchableOpacity>
            }
            <View style={
                [{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                    containerStyles
                ]
            }>
                {/* children */}
                {
                    children
                }
            </View>
        </Modal>
    );
};



export default ModalWrapper;