import AudioRecorderPlayer,
{
    AudioSet,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
    AVModeIOSOption,
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    RecordBackType,
    PlayBackType,
} from 'react-native-audio-recorder-player';

type recordType = (e: RecordBackType) => void
const audioRecorderPlayer = new AudioRecorderPlayer();
export default function useSoundRecorderHooks(listenerTime: number = 0.1) {



    const onStartRecord = async (onRecordListener: recordType) => {

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
        await audioRecorderPlayer.setSubscriptionDuration(listenerTime)
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
        console.log("PATH: ", result);
        return result;
    };

    const onStopRecord = async (callBack?: () => void) => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        callBack && callBack()
        console.log({
            recordSecs: 0,
        });
        console.log("PATH: ", result);
        return result;
    };

    const onStartPlay = async (onPlayListener?: (e: PlayBackType) => void) => {
        console.log('onStartPlay');
        await audioRecorderPlayer.setSubscriptionDuration(0.05);
        const msg = await audioRecorderPlayer.startPlayer();
        console.log(msg);
        audioRecorderPlayer.addPlayBackListener((e) => {
            onPlayListener && onPlayListener(e)
            return;
        });
    };

    const onPausePlay = async (callback?: () => void) => {
        console.log('onPausePlay');
        await audioRecorderPlayer.pausePlayer();
        // audioRecorderPlayer.removeRecordBackListener();
        callback && callback()
    };

    const onResumePlay = async (callback?: () => void) => {
        console.log('onResumePlay');
        await audioRecorderPlayer.resumePlayer();
        callback && callback()
    };

    const onStopPlay = async (callback?: () => void) => {
        console.log('onStopPlay');
        await audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        callback && callback()
    };

    const onSeek = async (milliseconds: number, callback?: () => void) => {
        console.log('onSeek');
        await audioRecorderPlayer.seekToPlayer(milliseconds);
        callback && callback()
    };


    return {
        onStartRecord,
        onStopRecord,
        onStartPlay,
        onPausePlay,
        onResumePlay,
        onStopPlay,
        onSeek,
        formateTime: audioRecorderPlayer.mmssss
    }

}