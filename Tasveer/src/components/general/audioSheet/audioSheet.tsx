import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import responsiveStyles from './styles/styles';
import { useAppThemeColors, useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import changeSVGColor from '@killerwink/lottie-react-native-color';
import IconFe from 'react-native-vector-icons/Feather';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import SoundSlider from './soundSlider';
import { ActivityIndicator, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { grantAudioPermission } from '../../../utils/permissions/permissions';
import {
    onStartRecord,
    onStopPlay,
    onStopRecord,
} from '../../../utils/audio/player';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { TextRegular } from '../text/text';
import ButtonRipple from '../customButton/buttonRipple';

export default VoiceNoteSheet = ({
    onPressSend,
    setVoicePath,
    voicePath,
    isLoading = false,
    onPressClose,
    isRecording,
    setIsRecording,
    isOpen = false,
}) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);


    //this flag is for toggling button text
    const [isRecordingStart, setIsRecordingStart] = useState(() => false);
    //recording states
    const [recordTime, setRecordTime] = useState('00:00:00');
    const audioRecorderPlayer = useRef(new AudioRecorderPlayer());
    audioRecorderPlayer.current.setSubscriptionDuration(0.09);

    //for recording limit
    //using ref because setTimeout not getting the
    //value useSate value of isRecordingStart
    const isStart = useRef(false);


    const stopRecording = () => {
        if (isRecordingStart) {
            onStopRecord(audioRecorderPlayer, setVoicePath);
            //this flag is for toggling button text
            setIsRecordingStart(false);
            //this flag is for toggling screen
            setIsRecording(false);
            setRecordTime('00:00:00');
            isStart.current = false;
        } else {
            setIsRecordingStart(true);
            onStartRecord(
                audioRecorderPlayer,
                setRecordTime,
            );

            //for recording limit 1 mint
            isStart.current = true;
            setTimeout(() => {
                if (isStart) {
                    onStopRecord(audioRecorderPlayer, setVoicePath);
                    //this flag is for toggling button text
                    setIsRecordingStart(false);
                    //this flag is for toggling screen
                    setIsRecording(false);
                    setRecordTime('00:00:00');
                }
            }, 1000 * 60);
        }
    }

    useEffect(() => {
        grantAudioPermission();
    }, []);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => {
                onPressClose && onPressClose();
                stopRecording()
            }}>
            <View
                style={[
                    StyleSheet.absoluteFillObject,
                    { backgroundColor: '#000', position: 'absolute', opacity: 0.8 },
                ]}
            />
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {isRecording ? (
                        <Recorder
                            onPress={stopRecording}
                            recordTime={recordTime}
                            isRecordingStart={isRecordingStart}
                            onPressClose={() => {
                                onPressClose && onPressClose();
                                stopRecording();
                            }}
                        />
                    ) : (
                        <Player
                            onPressDlt={() => {
                                onStopPlay(audioRecorderPlayer);
                                setIsRecording(true);
                                setIsRecordingStart(false);
                            }}
                            onPressSend={() => {
                                onStopPlay(audioRecorderPlayer);
                                // setIsRecording(true);
                                onPressSend && onPressSend();
                            }}
                            path={voicePath}
                            isLoading={isLoading}
                            onPressClose={onPressClose && onPressClose}
                        />
                    )}
                </View>
            </View>
        </Modal>
    );
};



const Player = ({ onPressDlt, onPressSend, path = '', isLoading, onPressClose }) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();

    return (
        <Animatable.View
            style={[
                styles.containerInnerStyle,
                { justifyContent: 'center', paddingHorizontal: 10 },
            ]}
            animation="slideInRight"
            duration={300}
            useNativeDriver>
            {isLoading && (
                <TouchableOpacity
                    style={styles.btnClose}
                    onPress={onPressClose && onPressClose}>
                    <IconEnt name="cross" color={colors.secondary1} size={24} />
                </TouchableOpacity>
            )}
            <SoundSlider
                iconColor={colors.primary1}
                thumbTintColor={colors.primary1}
                minimumTrackTintColor={colors.secondary1}
                maximumTrackTintColor={colors.grey1}
                textStyle={{ color: colors.grey1 }}
                containerStyle={styles.sliderStyle}
                path={path}
            />
            <View style={styles.btnRow}>
                {!isLoading && (
                    <TouchableOpacity onPress={onPressDlt && onPressDlt}>
                        <IconMc name="delete" size={24} color={'tomato'} />
                    </TouchableOpacity>
                )}

                {isLoading ? (
                    <ActivityIndicator size={'small'} color={colors.primary1} />
                ) : (
                    <Button
                        icon="send"
                        mode="contained"
                        onPress={onPressSend && onPressSend}
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        style={{ borderRadius: 1000 }}>
                        {'Send'}
                    </Button>
                )}
            </View>
        </Animatable.View>
    );
};

const Recorder = ({ onPress, recordTime, isRecordingStart, onPressClose }) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();
    return (
        <Animatable.View
            style={[styles.containerInnerStyle, { paddingVertical: 5 }]}
            animation="slideInRight"
            duration={300}
            useNativeDriver>
            <View style={styles.recordingView}>
                <ButtonRipple
                    style={styles.btnClose}
                    onPress={onPressClose && onPressClose}>
                    <IconEnt name="cross" color={colors.ternary1} size={24} />
                </ButtonRipple>
                <ButtonRipple
                    onPress={onPress && onPress}
                    style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 10000, }}>
                    {!isRecordingStart ? (
                        <View style={styles.circle} />
                    ) : (
                        <LottieView
                            source={changeSVGColor(
                                require('../../../../assets/lottieFiles/purpleCircle.json'),
                                colors.primary1,
                            )}
                            // duration={2500}
                            loop
                            autoPlay
                            style={styles.circle}
                        />
                    )}
                    {
                        isRecordingStart ?
                            <View style={[styles.iconMicView, { backgroundColor: 'transparent' }]}>
                                <IconMc name={'pause-circle'} color={"white"} size={50} />
                            </View>
                            :
                            <View style={styles.iconMicView}>
                                <IconFe name={'mic'} color={"white"} size={24} />
                            </View>
                    }
                </ButtonRipple>
                <TextRegular
                    style={styles.txtRecordedTime}
                >
                    {recordTime}
                </TextRegular>
            </View>
        </Animatable.View>
    );
};
