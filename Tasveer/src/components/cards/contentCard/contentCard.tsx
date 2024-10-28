import React, { useCallback, useState } from 'react';
import {
    View,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import IconIo from 'react-native-vector-icons/Ionicons';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import ButtonRipple from '../../general/customButton/buttonRipple';
import ContentHeader from '../contentHeader/contentHeader';
import { homeDataType } from '../../../constants/data/homeData';
import { MediaSlider } from '../../general/mediaSlider/mediaSlider';



type contentCardProps = {
    data: homeDataType,
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

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();

    const [isFav, setIsFav] = useState(false);
    const [saved, setSaved] = useState(false);

    // left icons
    const IconsLeft = useCallback(() => {
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
                </ButtonRipple>
            </View>
        )
    }, [isFav]);


    // save post icon
    const SaveIcon = useCallback(() => (<View style={[styles.row,
    { justifyContent: 'flex-end' }]}>
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
    </View>), [saved]);

    return (
        <View style={styles.container}>
            {/* header */}
            <ContentHeader
                time={data?.timeStamp}
                title={data.userName}
                // subtile={data.}
                onMenuPress={onMenu}
                onTitlePress={onTitle}
                subtitleIcon={subtitleIcon}
                image={data.uri}
                subtile=''
            />
            {/* ---- body---- */}
            <MediaSlider
                mediaList={data.content}
                indicatorSize={5}
                indicatorSpacing={3}
                indicatorColor={colors.ternary1}
                indicatorContainerWidth={50}
                indicatorRowContainerStyle={{ paddingVertical: 5 }}
                onDoubleTab={() => setIsFav(true)}
                indicatorLeftIcon={() => (
                    <IconsLeft />
                )}
                indicatorRightIcon={() => (
                    <SaveIcon />
                )}
            />
        </View>
    );
};

export default ContentCard;
