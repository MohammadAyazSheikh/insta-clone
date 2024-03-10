import React from 'react';
import {
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
                indicatorLeftIcon={() => (
                    <View style={styles.row}>

                        {/* like */}
                        <ButtonRipple
                            onPress={onLike}
                            style={styles.btnStyle}
                        >
                            <IconIo
                                name='heart-outline'
                                color={colors.secondary1}
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
                )}
                indicatorRightIcon={() => (
                    <View style={[styles.row,
                    { justifyContent: 'flex-end' }]}>
                        <ButtonRipple
                            onPress={onSave}
                            style={styles.btnStyle}
                        >
                            <IconIo
                                name='bookmark-outline'
                                color={colors.secondary1}
                                size={25}
                            />
                        </ButtonRipple>
                    </View>
                )}
            />
        </View>
    );
};

export default ContentCard;
