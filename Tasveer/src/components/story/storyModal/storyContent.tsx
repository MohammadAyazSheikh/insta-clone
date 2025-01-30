import React, { useEffect } from 'react';
import { Dimensions, ScrollView, TextInput, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    SharedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import colors from '../../../theme/colors';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { usePlayStory } from '../progressBar/playStoryHooks';
import { RenderStoryBars } from '../progressBar/progressBar';
import ContentHeader from '../../cards/contentHeader/contentHeader';
import IconAnt from '@expo/vector-icons/AntDesign';
import IconFe from '@expo/vector-icons/Feather';
import { StoryMedia } from './storyMedia';
import { storyDataType } from '../../../constants/data/storyData';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';
import moment from 'moment';
import { useKeyboardVisibility } from '../../../hooks/keyboardHooks';

const { width } = Dimensions.get('window');



type storyContentProps = {
    scrollIndex: number;
    scrollX: SharedValue<number>;
    scrollRef: React.MutableRefObject<ScrollView | null>;
    isModalOpen: React.MutableRefObject<boolean>;
    contentData: storyDataType;
    numberOfUsers: number;
    onClose?: () => void;
    onNextStory: (barIndex: number, storyIndex: number) => void,
}

const StoryContent = ({
    scrollIndex,
    scrollX,
    scrollRef,
    contentData,
    numberOfUsers,
    isModalOpen,
    onClose,
    onNextStory
}: storyContentProps) => {


    const { styles } = useStyles(styleSheet);

    const { visible: isKeyBoard, style: animatedKeyboardStyle } = useKeyboardVisibility();

    //opacity animation for header and footer
    const opacity = useSharedValue(1);
    const hide = (duration = 300) => {
        opacity.value = withTiming(0, { duration });
    }
    const show = (duration = 300) => {
        opacity.value = withTiming(1, { duration });
    }



    // animated values for story bars
    const animValuesBar = contentData.content.map(item => useSharedValue(0));
    //animations hooks for bars
    const { playNext, playPrev, pauseStory, playStory, currentBarIndex } =
        usePlayStory(
            isModalOpen,
            numberOfUsers,
            scrollIndex,
            scrollX,
            scrollRef,
            animValuesBar,
            () => {
                onClose && onClose()
            },
            onNextStory,
        );





    //input range for scroll animation
    const inputRange = [
        (scrollIndex - 1) * width,    //prev page
        scrollIndex * width,          //current page
        (scrollIndex + 1) * width     //next page
    ];

    // styles for story container when user scrolls
    const containerStyle = useAnimatedStyle(() => {
        const rotateY = interpolate(
            scrollX.value,
            inputRange,
            [45, 0, -45],
            Extrapolation.CLAMP
        );

        // const rotateZ = interpolate(
        //     scrollX.value,
        //     inputRange,
        //     [10, 0, -10],
        //     Extrapolation.CLAMP
        // );
        const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.8, 1, 0.8],
            Extrapolation.CLAMP
        );


        return {
            transform: [
                { rotateY: `${rotateY}deg` },
                // { rotateZ: `${rotateZ}deg` },
                { scale }
            ],
        };
    });

    // pause story when keyboard is visible
    useEffect(() => {
        if (isModalOpen?.current) {
            isKeyBoard ? pauseStory() : playStory()
        }
    }, [isKeyBoard])


    return (

        <Animated.View
            style={[
                styles.container,
                containerStyle,
            ]}
        >
            <View
                style={[
                    styles.container,
                ]}
            >
                {/* header */}
                <Animated.View style={[
                    styles.col,
                    { opacity }
                ]}>
                    {/* progress bars */}
                    <RenderStoryBars animatedValuesBar={animValuesBar} />
                    {/* header */}
                    <ContentHeader
                        image={contentData.user.profileImage}
                        title={contentData.user.userName}
                        time={moment(contentData.timeStamp).fromNow()}
                        subtile=''
                        onCancel={onClose}
                    />
                </Animated.View>
                {/* content */}
                <StoryMedia
                    mediaSource={{ uri: contentData.content[currentBarIndex.current].uri }}
                    onPause={() => {
                        pauseStory();
                        hide();
                    }}
                    onPlay={() => {
                        playStory();
                        show();
                    }}
                    onPrev={playPrev}
                    onNext={playNext}
                    onSwipeDown={onClose}
                />

                {/* Input and Send button */}
                <Animated.View style={[
                    styles.row,
                    { opacity, marginTop: 10 },
                    animatedKeyboardStyle
                ]}>
                    <TextInput
                        placeholderTextColor={colors.grey1}
                        style={styles.txtInput}
                        placeholder='Reply story'
                    />
                    {/* favorite */}
                    <ButtonRipple
                        style={styles.btnStyles}
                    >
                        <IconAnt
                            name='hearto'
                            color={"red"}
                            size={20}
                        />
                    </ButtonRipple>
                    {/* send button */}
                    <ButtonRipple
                        style={styles.btnStyles}
                    >
                        <IconFe
                            name='send'
                            color={colors.grey1}
                            size={20}
                        />
                    </ButtonRipple>
                </Animated.View>
            </View >
        </Animated.View >

    );
};





export { StoryContent };