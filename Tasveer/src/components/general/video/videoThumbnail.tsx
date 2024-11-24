import React, { useEffect, useState } from 'react';
import ApiStatusIndicator from '../apiStatusIndicator/ApiStatusIndicator';
import { View, ViewStyle } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';

type vidProps = {
    source: string | any,
    style: ViewStyle | ViewStyle[],
}

function VideoThumbnail({
    source,
    style
}: vidProps) {

    //for thumbnail
    const [thumbnail, setThumbnail] = useState<null | string>(null);

    //getting thumbnail on mount
    useEffect(() => {
        const url = source?.uri || source
        generateThumbnail(url, setThumbnail);
    }, []);

    return (
        <View style={style}>
            {
                //video thumbnail
                thumbnail ?
                    <View style={{ ...StyleSheet.absoluteFillObject }}>
                        <Image source={{ uri: thumbnail! }} style={{ ...StyleSheet.absoluteFillObject }} />
                    </View>
                    :
                    null
            }
            {/* video status */}
            <ApiStatusIndicator
                isLoading={thumbnail ? false : true}
                style={{ backgroundColor: "transparent" }} />
        </View>
    )
}


export default React.memo(VideoThumbnail);


export const generateThumbnail = async (url: string, setUrl: React.Dispatch<React.SetStateAction<string | null>>) => {
    try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(
            url,
            {
                time: 15000,
            }
        );
        setUrl(uri);
    } catch (e) {
        console.warn(e);
    }
};