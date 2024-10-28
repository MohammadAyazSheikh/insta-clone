import React, { useState } from 'react';
import { View, StyleSheet, Modal, Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../../theme/colors';
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import { VideoPlyer } from './videoPlayerList';
import ButtonRipple from '../customButton/buttonRipple';
import IconFe from 'react-native-vector-icons/Feather';

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

    const { styles } = useFunctionalOrientation(responsiveStyles);

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
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.SliderView}>
                        <VideoPlyer
                            videoList={videoList}
                            onBuffer={() => {
                                console.log("buffer")
                            }}
                            onLoad={() => {
                                console.log("load")
                            }}
                            onLoadStart ={ (()=>{
                                console.log("start")
                            })}
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
            </View>
        </Modal >
    )
}
export default VideoPlayerModal;
