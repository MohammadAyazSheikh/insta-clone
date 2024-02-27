import React from 'react';
import {
    Image,
    TouchableOpacity,
    View,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconIo from 'react-native-vector-icons/Ionicons';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { TextBold, TextRegular } from '../../general/text/text';
import UserAvatar from '../../general/avatar/avatar';
import ContentHeader from '../contentHeader/contentHeader';
import { Slider } from '../../general/imageSlider/imageSlider';
import { storyData } from '../../../constants/data/storyData';
import { homeDataType } from '../../../constants/data/homeData';



type contentCardProps = {
    data: homeDataType,
    subtitleIcon?: React.ReactNode,
    onMenuPress?: () => void,
    onTitlePress?: () => void,
}

const ContentCard = ({
    data,
    subtitleIcon,
    onMenuPress = () => '',
    onTitlePress = () => '',
}: contentCardProps) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();

    const icon = <IconMtc
        name={"movie-play"}
        color={colors.secondary1}
        size={14}
    />
    return (
        <View style={styles.container}>
            {/* header */}
            <ContentHeader
                time={data?.timeStamp}
                title={data.userName}
                // subtile={data.}
                onMenuPress={onMenuPress}
                onTitlePress={onTitlePress}
                subtitleIcon={subtitleIcon}
                image={data.uri}
                subtile=''
            />
            {/* ---- body---- */}
            <Slider
                imageList={data.content}
                indicatorSize={5}
                indicatorSpacing={3}
                indicatorColor={colors.ternary1}
                indicatorContainerWidth={50}
                indicatorRowContainerStyle={{ paddingVertical: 5 }}
                indicatorLeftIcon={() => (
                    <View style={styles.row}>

                        {/* like */}
                        <ButtonRipple
                            onPress={() => ''}
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
                            onPress={() => ''}
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
                            onPress={() => ''}
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
                            onPress={() => ''}
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
