import React from 'react';
import {
    Image, StyleSheet, View, ViewStyle
} from 'react-native';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { discoverDataType } from '../../../constants/data/discoverData';
import VideoPlayerContent from '../../general/video/videoPlayerContent';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';



type contentCardProps = {
    data: discoverDataType,
    isAllSquare?: boolean,
    pauseAll: boolean,
    containerStyles?: ViewStyle,
    onPress?: () => void,
}

const ContentItemCard = ({
    data,
    isAllSquare,
    pauseAll,
    containerStyles,
    onPress,
}: contentCardProps) => {

    const { styles, theme: { colors } } = useStyles(styleSheet);


    const media = typeof data?.uri == 'string' ? { uri: data.uri } : data.uri;
    const isImage = data.type == 'image';
    const isReel = data.type == 'reel';
    const isVideo = data.type == 'video';
    const isMany = data.numberOfItems > 0;

    return (
        <ButtonRipple
            onPress={onPress}
            style={[styles.container,
            isReel && !isAllSquare ? styles.reelContainer : {},
                containerStyles
            ]}
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
                        paused={pauseAll}
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
