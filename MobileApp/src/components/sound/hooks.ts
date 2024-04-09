import AudioRecorderPlayer,
{
    AudioSet,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
    AVModeIOSOption,
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    RecordBackType,
} from 'react-native-audio-recorder-player';

type recordType = (e: RecordBackType) => void
const audioRecorderPlayer = new AudioRecorderPlayer();
export default function useSoundRecorderHooks() {



    const onStartRecord = async ( onRecordListener :recordType) => {

        const audioSet: AudioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVModeIOS: AVModeIOSOption.measurement,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        const meteringEnabled = true;
        const path = undefined;
        const result = await audioRecorderPlayer.startRecorder(path, audioSet, meteringEnabled);
       await audioRecorderPlayer.setSubscriptionDuration(0.1)
        audioRecorderPlayer.addRecordBackListener((e) => {
            onRecordListener(e)
            // console.log({
            //     recordSecs: e.currentPosition,
            //     recordTime: audioRecorderPlayer.mmssss(
            //         Math.floor(e.currentPosition),
            //     ),
            // });
            // console.log(e.currentMetering)
            return;
        });
        console.log("PATH: ",result);
        return result;
    };

    const onStopRecord = async (callBack?:()=>void) => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        callBack && callBack()
        console.log({
            recordSecs: 0,
        });
        console.log("PATH: ",result);
        return result;
    };

    const onStartPlay = async () => {
        console.log('onStartPlay');
        const msg = await audioRecorderPlayer.startPlayer();
        console.log(msg);
        audioRecorderPlayer.addPlayBackListener((e) => {
            console.log({
                currentPositionSec: e.currentPosition,
                currentDurationSec: e.duration,
                playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
            return;
        });
    };

    const onPausePlay = async () => {
        await audioRecorderPlayer.pausePlayer();
    };

    const onStopPlay = async () => {
        console.log('onStopPlay');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
    };


    return {
        onStartRecord,
        onStopRecord,
        onStartPlay,
        onPausePlay,
    }

}