import React from 'react';
import {
    Image, StyleSheet, View
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { discoverDataType } from '../../../constants/data/discoverData';
import VideoPlayerContent from '../../general/video/videoPlayerContent';



type contentCardProps = {
    data: discoverDataType,
    onPress?: () => void,
}

const ContentItemCard = ({
    data,
    onPress,
}: contentCardProps) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);

    const colors = useAppThemeColors();
    const media = typeof data?.uri == 'string' ? { uri: data.uri } : data.uri;
    const isImage = data.type == 'image';
    const isReel = data.type == 'reel';
    const isVideo = data.type == 'video';
    const isMany = data.numberOfItems > 0;

    return (
        <ButtonRipple
            onPress={onPress}
            style={[styles.container, isReel ? styles.reelContainer : {}]}
        >

            {
                isImage ?
                    <Image
                        source={media}
                        style={[styles.imgStyles]}
                    />
                    :
                    <VideoPlayerContent
                        mute
                        showVolumeIcon={false}
                        source={media}
                        style={[styles.imgStyles]}
                        resizeMode='cover'
                    />
            }
            {
                (isMany || isVideo || isReel) ?
                    < IconMtc
                        name={(isMany) ? "layers" : "movie-play"}
                        color={colors.secondary1}
                        size={25}
                        style={styles.iconStyles}
                    />
                    :
                    null
            }
            {
                //added this view because video blocking click event
                <View
                    style={{ ...StyleSheet.absoluteFillObject }}
                />

            }
        </ButtonRipple>
    );
};

export default ContentItemCard;
