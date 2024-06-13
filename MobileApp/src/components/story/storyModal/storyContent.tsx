import React, { useState } from 'react';
import { Dimensions, ScrollView, TextInput, } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    SharedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import colors from '../../../theme/colors';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { usePlayStory } from '../progressBar/playStoryHooks';
import { RenderStoryBars } from '../progressBar/progressBar';
import ContentHeader from '../../cards/contentHeader/contentHeader';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFe from 'react-native-vector-icons/Feather';
import { StoryMedia } from './storyMedia';
import { storyDataType } from '../../../constants/data/storyData';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';

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


    const { styles } = useFunctionalOrientation(responsiveStyles);


    //holds value if visible story in screen or not
    const [isVisible, setIsVisible] = useState(false);

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
            isVisible
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




    return (

        <Animated.View
            style={[
                styles.container,
                containerStyle
            ]}
        >
            <VisibilitySensor onChange={(isVisible) => setIsVisible(isVisible)}
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
                        image={contentData.image}
                        title={contentData.userName}
                        time={contentData.timeStamp}
                        subtile=''
                    />
                </Animated.View>
                {/* content */}
                <StoryMedia
                    mediaSource={contentData.content[currentBarIndex.current].image}
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
                />

                {/* Input and Send button */}
                <Animated.View style={[
                    styles.row,
                    { opacity }
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
            </VisibilitySensor>
        </Animated.View>

    );
};





export { StoryContent };