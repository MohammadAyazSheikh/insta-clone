
import React from 'react';
import { avatarProps } from './storyAvatar';
import LoadingRing from './loadingRing';
import StoryAvatar from './storyAvatar';
import { TextRegular } from '../../general/text/text';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import { RADIUS_STORY_AVATAR, STROKE_STORY_AVATAR } from '../renderStory';
import UserAvatar from '../../general/avatar/avatar';
import IconEn from 'react-native-vector-icons/Entypo';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { StyleSheet } from 'react-native';


type prop = {
    isLoading?: boolean,
    onPress?: () => void,
    title?: string,
} & avatarProps

export default function RenderAvatar({
    isLoading,
    title,
    onPress,
    ...rest
}: prop) {

    const colors = useAppThemeColors();
    const width = ((rest?.radius! * 2) + rest?.strokeWidth!)
    return (
        <ButtonRipple
            style={styles.container}
            onPress={onPress}
        >
            {/* avatar */}
            {
                isLoading ?
                    <LoadingRing
                        {...rest}
                        opacityBackRing={0.2}
                    />
                    :
                    <StoryAvatar
                        {...rest}
                    />
            }
            {/* title* */}
            {
                title ?
                    <TextRegular
                        style={{
                            fontSize: 12,
                            color: colors.secondary1,
                        }}
                    >
                        {title}
                    </TextRegular>
                    :
                    null
            }
        </ButtonRipple>
    )
}


export const RenderYourStory = () => {
    const colors = useAppThemeColors();

    return (
        <ButtonRipple
            style={styles.container}
            onPress={() => { }}
        >
            <UserAvatar
                showRing
                size={(RADIUS_STORY_AVATAR * 1.9)}
                // name='Your story'
                // containerStyle={{ marginHorizontal: 3 }}
                // nameTextStyle={{ marginVertical: 5, fontSize: 12 }}
                edgeIcon={
                    <ButtonRipple style={[styles.iconEdge,
                    { backgroundColor: colors.ternary1 }]}>
                        <IconEn
                            size={18}
                            name='plus'
                            color={'white'}
                        />
                    </ButtonRipple>
                }
            />
            <TextRegular
                style={{
                    fontSize: 12,
                    color: colors.secondary1,
                }}
            >
                Your story
            </TextRegular>
        </ButtonRipple>
    )
}

const width  = RADIUS_STORY_AVATAR * 2 + STROKE_STORY_AVATAR;
const height = RADIUS_STORY_AVATAR * 2 + STROKE_STORY_AVATAR + 20;
const styles = StyleSheet.create({
    container: {
        //setting width and height causing app crash
        // width,
        // height,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconEdge: {
        padding: 3,
        borderRadius: 100,
        position: 'absolute',
        bottom: "5%",
        right: '5%'
    }
})