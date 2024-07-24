import React, { useState } from 'react';
import { Image, View } from 'react-native';
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
// import Video from 'react-native-video';
import { messageObjType } from '../../../constants/types/sharedTypes';
import IconAnt from 'react-native-vector-icons/AntDesign';
import colors from '../../../theme/colors';
import VideoPlayerModal from '../../general/videoSlider/videoPlayerModal';
import BubbleWrapper from '../bubbleWrapper/bubbleWrapper';

type propsType = {
    message: messageObjType,
    onPress?: () => void,
    onLongPress?: () => void,
}

export default function VideoBubble(props: propsType) {

    const [showVideo, setShowVideo] = useState(false);
    const { styles } = useFunctionalOrientation(responsiveStyles);
    const {
        video,
    } = props?.message;




    return (
        <BubbleWrapper {...props?.message}
            onPress={() => {
                setShowVideo(true);
                props?.onPress && props?.onPress();
            }}
            onLongPress={props?.onLongPress}
        >
            {/* ---video---- */}
            <View
                style={[styles.videoView]}>
                <Image
                    source={{ uri: video }}
                    style={[styles.videoStyles]}
                    resizeMode='contain'
                />
                <View
                    style={styles.btnPlay}
                >
                    <IconAnt
                        name='play'
                        size={34}
                        color={colors.primary2}
                    />
                </View>
                {/* <Video
                        source={{ uri: video }}
                        style={[styles.videoStyles]}
                        resizeMode='contain'
                        controls={true}
                        paused
                    /> */}
            </View>
            {/* ----------Video modal----- */}
            <VideoPlayerModal
                videoList={[video!]}
                isOpen={showVideo}
                onClose={() => setShowVideo(false)}
                hideFooter
            />
        </BubbleWrapper>
    );
}

