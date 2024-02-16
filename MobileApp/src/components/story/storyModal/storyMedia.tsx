import React from 'react';
import { View, Image, } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';

import { TouchHold } from '../../general/customButton/touchHoldButton';



type storyMediaProps = {
    onPause?: () => void,
    onPlay?: () => void,
    onNext?: () => void,
    onPrev?: () => void,
    mediaType?: 'image' | 'video',
    mediaSource?: any,
    description?: string,
}

const StoryMedia = ({
    onPause,
    onPlay,
    onNext,
    onPrev,
    mediaSource,
    mediaType,
    description,
}: storyMediaProps) => {


    const { styles } = useFunctionalOrientation(responsiveStyles);


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
                styles={[styles.btnStory, styles.btnStoryLeft]}
            />
            {/* right button */}
            <TouchHold
                onHold={onPause}
                onRelease={onPlay}
                onPress={onNext}
                styles={[styles.btnStory, styles.btnStoryRight]}
            />
        </View>

    );
};





export { StoryMedia };