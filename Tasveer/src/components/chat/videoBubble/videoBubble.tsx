import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import styleSheet from './styles/styles';
import { messageObjType } from '../../../constants/types/sharedTypes';
import IconAnt from '@expo/vector-icons/AntDesign';
import colors from '../../../theme/colors';
import VideoPlayerModal from '../../general/videoSlider/videoPlayerModal';
import BubbleWrapper from '../bubbleWrapper/bubbleWrapper';
import { useStyles } from 'react-native-unistyles';
import { generateThumbnail } from '../../general/video/videoThumbnail';

type propsType = {
    message: messageObjType,
    onPress?: () => void,
    onLongPress?: () => void,
}

export default function VideoBubble(props: propsType) {

    const [thumbnail, setThumbnail] = useState<null | string>(null);

    const [showVideo, setShowVideo] = useState(false);
    const { styles } = useStyles(styleSheet);
    const {
        video,
    } = props?.message;


    //getting thumbnail on mount
    useEffect(() => {
        generateThumbnail(video!, setThumbnail);
    }, []);

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
                    source={{ uri: thumbnail! }}
                    style={[styles.videoStyles]}
                    resizeMode='contain'
                />
                <View
                    style={styles.btnPlay}
                >
                    <IconAnt
                        name='play'
                        size={34}
                        color={colors.secondary1}
                    />
                </View>
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

