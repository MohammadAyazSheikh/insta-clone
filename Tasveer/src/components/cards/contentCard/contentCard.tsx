import React, { useCallback, useState } from 'react';
import {
    View,
} from 'react-native';
import styleSheet from './styles/styles';
import IconIo from '@expo/vector-icons/Ionicons';
import ButtonRipple from '../../general/customButton/buttonRipple';
import ContentHeader from '../contentHeader/contentHeader';
import { postType } from '../../../constants/data/homeData';
import { MediaSlider } from '../../general/mediaSlider/mediaSlider';
import { useStyles } from 'react-native-unistyles';
import moment from 'moment';
import { TextRegular } from '../../general/text/text';
import { Text } from 'react-native';
import Caption from './caption';


type contentCardProps = {
    data: postType,
    subtitleIcon?: React.ReactNode,
    onMenu?: () => void,
    onTitle?: () => void,
    onComment?: () => void,
    onLike?: () => void,
    onShare?: () => void,
    onSave?: () => void,
}

const ContentCard = ({
    data,
    subtitleIcon,
    onMenu = () => '',
    onTitle = () => '',
    onComment = () => '',
    onLike = () => '',
    onShare = () => '',
    onSave = () => '',
}: contentCardProps) => {


    const { styles, theme: { colors } } = useStyles(styleSheet)

    const [isFav, setIsFav] = useState(false);
    const [saved, setSaved] = useState(false);


    // engagements 
    const BottomIcons = useCallback(() => {
        return (
            <View style={styles.row}>
                {/* like */}
                <ButtonRipple
                    onPress={() => {
                        setIsFav(prev => !prev);
                        onLike && onLike();
                    }}
                    style={styles.btnStyle}
                >
                    <IconIo
                        name={isFav ? 'heart' : 'heart-outline'}
                        color={isFav ? "red" : colors.secondary1}
                        size={25}
                    />
                    <TextRegular style={styles.txtEngagement}>
                        7k
                    </TextRegular>
                </ButtonRipple>
                {/* comment */}
                <ButtonRipple
                    onPress={onComment}
                    style={styles.btnStyle}
                >
                    <IconIo
                        name='chatbubble-outline'
                        color={colors.secondary1}
                        size={25}
                    />
                    <TextRegular style={styles.txtEngagement}>
                        2.7k
                    </TextRegular>
                </ButtonRipple>
                {/* share */}
                <ButtonRipple
                    onPress={onShare}
                    style={styles.btnStyle}
                >
                    <IconIo
                        name='paper-plane-outline'
                        color={colors.secondary1}
                        size={25}
                    />
                    <TextRegular style={styles.txtEngagement}>
                        1.3k
                    </TextRegular>
                </ButtonRipple>
                <View style={{ flex: 1 }} />
                <ButtonRipple
                    onPress={() => {
                        setSaved(prev => !prev);
                        onSave && onSave();
                    }}
                    style={styles.btnStyle}
                >
                    <IconIo
                        name={saved ? 'bookmark' : 'bookmark-outline'}
                        color={colors.secondary1}
                        size={25}
                    />
                </ButtonRipple>
            </View>
        )
    }, [isFav, saved]);



    return (
        <View style={styles.container}>
            {/* header */}
            <ContentHeader
                title={data.user.userName}
                // subtile={data.}
                onMenuPress={onMenu}
                onTitlePress={onTitle}
                subtitleIcon={subtitleIcon}
                image={{ uri: data.user.profileImage }}
                subtile=''
            />
            {/* ---- body---- */}
            <MediaSlider
                mediaList={data.media}
                indicatorSize={5}
                indicatorSpacing={3}
                indicatorColor={colors.ternary1}
                indicatorContainerWidth={50}
                indicatorRowContainerStyle={{ paddingVertical: 5 }}
                onDoubleTab={() => setIsFav(true)}
            />
            {/* engagement */}
            <BottomIcons />
            {/* caption */}
            <View style={styles.captionView}>
                {
                    data.caption ?
                        <Caption text={data.caption} />
                        :
                        null
                }
                <TextRegular style={styles.txtTime}>
                    {moment(data?.timestamp.toString()).fromNow()}
                </TextRegular>
            </View>
        </View >
    );
};

export default ContentCard;
