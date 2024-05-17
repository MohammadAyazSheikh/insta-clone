import React, { useState } from 'react';
import {
    Pressable,
    View,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIo from 'react-native-vector-icons/Ionicons';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import ButtonRipple from '../../general/customButton/buttonRipple';
import ContentHeader from '../contentHeader/contentHeader';
import { homeDataType } from '../../../constants/data/homeData';
import { MediaSlider } from '../../general/mediaSlider/mediaSlider';
import UserAvatar from '../../general/avatar/avatar';
import { TextBold, TextItalic, TextRegular } from '../../general/text/text';
import CustomButton from '../../general/customButton/customButton';
import VideoPlayerContent from '../../general/video/videoPlayerContent';
import { remoteVideos } from '../../../constants/data/remoteVideo';


type dataProp = typeof remoteVideos[0]
type reelCardProps = {
    data:dataProp,
    onMenu?: () => void,
    onTitle?: () => void,
    onComment?: () => void,
    onLike?: () => void,
    onShare?: () => void,
    onSave?: () => void,
}

const ReelCard = ({
    data,
    onMenu = () => '',
    onTitle = () => '',
    onComment = () => '',
    onLike = () => '',
    onShare = () => '',
    onSave = () => '',
}: reelCardProps) => {

    const { styles, width } = useFunctionalOrientation(responsiveStyles);
    // const colors = useAppThemeColors();
    const [numOfLine, setNumOfLine] = useState<number | undefined>(1);
    const [liked, setLiked] = useState(false);

    return (
        <View style={styles.container}>
            {/* video player */}
            <VideoPlayerContent
                source={{ uri: data.uri}}
                style={styles.video}
                showVolumeIcon = {false}
                resizeMode='cover'
            />
            {/* camera */}
            <ButtonRipple
                style={[styles.btnStyle, styles.cameraBtn]}
            >
                <IconIo
                    name='camera-outline'
                    color={'white'}
                    size={25}
                />
            </ButtonRipple>
            {/* bottom content */}
            <View style={[styles.row, numOfLine == undefined && styles.rowCover]}>
                <View style={styles.infoView}>
                    <View style={styles.userInfoView}>
                        <UserAvatar
                            // image={image}
                            size={50}
                        // name={title}
                        />
                        <View style={{ maxWidth: width / 2.5 }}>
                            <TextBold style={styles.txtName} numberOfLines={1}>
                                {data.title}
                            </TextBold>
                        </View>
                        <CustomButton
                            textProps={{ style: styles.txtName }}
                            style={styles.btnFollow}
                            buttonText='Follow'
                        />
                    </View>
                    {/* description */}
                    <Pressable
                        onPress={() => setNumOfLine(numOfLine == 1 ? undefined : 1)}
                        style={styles.descView} >
                        <TextRegular style={styles.txtDescription} numberOfLines={numOfLine}>
                        {data.description}
                        </TextRegular>
                    </Pressable>
                </View>
                {/*left side button column  */}
                <View style={styles.col}>
                    {/* like */}
                    <ButtonRipple
                        onPress={() => {
                            setLiked(val => !val)
                            onLike()
                        }}
                        style={styles.btnStyle}
                    >
                        <IconIo
                            name={liked ? 'heart' : 'heart-outline'}
                            color={liked ? 'red' : 'white'}
                            size={25}
                        />
                        <TextRegular style={styles.txtStats}>
                            12.1k
                        </TextRegular>
                    </ButtonRipple>
                    {/* comment */}
                    <ButtonRipple
                        onPress={onComment}
                        style={styles.btnStyle}
                    >
                        <IconIo
                            name='chatbubble-outline'
                            color={'white'}
                            size={25}
                        />
                        <TextRegular style={styles.txtStats}>
                            3k
                        </TextRegular>
                    </ButtonRipple>
                    {/* share */}
                    <ButtonRipple
                        onPress={onShare}
                        style={styles.btnStyle}
                    >
                        <IconIo
                            name='paper-plane-outline'
                            color={'white'}
                            size={25}
                        />
                        <TextRegular style={styles.txtStats}>
                            139
                        </TextRegular>
                    </ButtonRipple>
                </View>
            </View>
        </View>
    );
};

export default ReelCard;
