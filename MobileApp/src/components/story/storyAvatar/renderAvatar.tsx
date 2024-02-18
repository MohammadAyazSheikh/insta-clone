
import React from 'react';
import { avatarProps } from './storyAvatar';
import LoadingRing from './loadingRing';
import StoryAvatar from './storyAvatar';
import ButtonRipple from '../../general/customButton/buttonRipple';


type prop = {
    isLoading?: boolean,
    onPress?: () => void
} & avatarProps

export default function RenderAvatar({
    isLoading,
    onPress,
    ...rest
}: prop) {



    return (
        <ButtonRipple
            style={{ borderRadius: 1000 }}
            onPress={onPress}
        >
            {isLoading ?
                <LoadingRing
                    {...rest}
                    opacityBackRing={0.2}
                />
                :
                <StoryAvatar
                    {...rest}
                />}
        </ButtonRipple>
    )
}



