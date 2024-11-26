import React, { useState } from 'react';
import { View, StyleSheet, Modal, Pressable, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import colors from '../../../theme/colors';
import styleSheet from './styles/styles';
import { VideoPlyer } from './videoPlayerList';
import ButtonRipple from '../customButton/buttonRipple';
import IconFe from '@expo/vector-icons/Feather';
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

type sliderProps = {
    isOpen: boolean,
    onClose: () => void,
    scrollIndex?: number,
    videoList: string[],
    onSend?: (text: string) => void,
    hideFooter?: boolean,
}

const VideoPlayerModal = ({
    isOpen,
    onClose,
    onSend,
    scrollIndex,
    videoList,
    hideFooter = false,
}: sliderProps) => {

    const { styles } = useStyles(styleSheet);

    const [text, setText] = useState<string>();

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={onClose}
        >
            <View style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: '#000', position: 'absolute', opacity: 0.8 }
            ]} />
            <SafeAreaProvider>
                <SafeAreaView style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.SliderView}>
                            <VideoPlyer
                                videoList={videoList}
                            />
                        </View>
                        {/* send message row */}
                        {
                            !hideFooter ?
                                <View style={styles.senderContainer}>
                                    {/* text input */}
                                    <TextInput
                                        style={styles.txtInput}
                                        placeholder="Type message..."
                                        multiline
                                        value={text}
                                        onChangeText={(value) => {
                                            setText(value)
                                        }}
                                    />
                                    {/* send button */}
                                    <ButtonRipple
                                        style={styles.btnSendStyle}
                                        onPress={() => {
                                            (text && onSend) && onSend(text);
                                            setText('');
                                        }}
                                    >
                                        <IconFe
                                            name='send'
                                            size={20}
                                            color={"white"}
                                        />
                                    </ButtonRipple>
                                </View>
                                :
                                null
                        }
                        {/* close button */}
                        <Pressable
                            style={styles.btnStyle}
                            onPress={() => onClose()}
                        >
                            <Icon name='closecircle' size={25} color={colors.secondary1} />
                        </Pressable>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </Modal >
    )
}
export default VideoPlayerModal;
