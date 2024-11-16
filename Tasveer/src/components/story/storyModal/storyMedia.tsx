import React from 'react';
import { View, Image, } from 'react-native';
import { TouchHold } from '../../general/customButton/touchHoldButton';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';



type storyMediaProps = {
    onPause?: () => void,
    onPlay?: () => void,
    onNext?: () => void,
    onPrev?: () => void,
    onSwipeDown?: () => void,
    mediaType?: 'image' | 'video',
    mediaSource?: any,
    description?: string,
}

const StoryMedia = ({
    onPause,
    onPlay,
    onNext,
    onPrev,
    onSwipeDown,
    mediaSource,
    mediaType,
    description,
}: storyMediaProps) => {


    const { styles } = useStyles(styleSheet);


    return (

        <View style={styles.contentContainer}>
            {
                mediaSource ?
                    <Image
                        style={styles.imgContent}
                        source={mediaSource}
                    />
                    :

                    <Image
                        style={styles.imgContent}
                        source={require('../.././../../assets/images/placeholder.png')}
                    />
            }
            {/* left button */}
            <TouchHold
                onHold={onPause}
                onRelease={onPlay}
                onPress={onPrev}
                onSwipeDown={onSwipeDown}
                enableDownGesture
                gestureRootViewStyles={[styles.btnStory, styles.btnStoryLeft]}
            />
            {/* right button */}
            <TouchHold
                onHold={onPause}
                onRelease={onPlay}
                onPress={onNext}
                onSwipeDown={onSwipeDown}
                enableDownGesture
                gestureRootViewStyles={[styles.btnStory, styles.btnStoryRight]}
            />
        </View>

    );
};





export { StoryMedia };