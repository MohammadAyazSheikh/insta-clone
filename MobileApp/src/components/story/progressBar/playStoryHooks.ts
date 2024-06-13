import { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    ScrollView,
} from 'react-native';
import {
    SharedValue,
    runOnJS,
    useDerivedValue,
} from 'react-native-reanimated';
import { animateBar, pauseBar, resetAnimation } from './progressBar';
const { width } = Dimensions.get('window');


export const usePlayStory = (
    isModalOpen: React.MutableRefObject<boolean>,
    numberOfUsers: number,
    storyIndex: number,
    scrollX: SharedValue<number>,
    scrollRef: React.MutableRefObject<ScrollView | null>,
    animValuesBar: SharedValue<number>[],
    onEnd: () => void,
    onNextStory: (barIndex: number, storyIndex: number) => void,
    isVisible: boolean,
) => {

    //since currentBarIndex ref can't update the UI and we want to switch next story of a user
    //so toggling rerender state in order to get new updated currentBarIndex value
    //I know it is very bad approach but I could'nt found a better solution 
    //so please don't yell at me 😬 

    const [_, setRerender] = useState(false);

    //holds index of bars
    const currentBarIndex = useRef(0);
    //flag for paused auto play
    const paused = useRef(false);
    //we  toggles this flag when story visible or shown when user scrolls
    const isPlaying = useRef(false);


    //scrollTo specified  index
    const scrollToUserStory = (index: number) => {
        scrollRef?.current?.scrollTo({
            y: 0,
            x: (index) * width,
        })
    }

    //scrollTo  next
    const scrollToNextUserStory = () => {
        scrollRef?.current?.scrollTo({
            y: 0,
            x: (storyIndex + 1) * width,
        })
    }


    //scrollTo  prev
    const scrollToPrevUserStory = () => {
        scrollRef?.current?.scrollTo({
            y: 0,
            x: (storyIndex - 1) * width,
        })
    }

    const playStory = (index?: number) => {
        const i = index || currentBarIndex.current;
        onNextStory(i, storyIndex)
        animateBar(
            {
                toValue: 100,
                animatedValue: animValuesBar[i]
            },
            () => {
                //if modal is not opened
                if (!isModalOpen.current) {
                    return;
                }

                //if last user's last story close modal
                if (numberOfUsers - 1 == storyIndex &&
                    currentBarIndex.current == animValuesBar.length - 1) {
                    onEnd && onEnd();
                    return;
                }

                //if paused true return and don't play next bar
                if (paused.current) {
                    paused.current = false;
                    return;
                }
                //if last bar switch to next user's story
                if (currentBarIndex.current == animValuesBar.length - 1) {
                    scrollToNextUserStory();
                }


                //else play next story and inc index
                if (currentBarIndex.current < animValuesBar.length - 1) {
                    playStory(currentBarIndex.current + 1);
                    currentBarIndex.current += 1;
                    setRerender(prev => !prev);
                }
            }
        );
    }

    const playNext = () => {
        //if current is not the last bar
        if (currentBarIndex.current < animValuesBar.length - 1) {
            //paused the auto play
            paused.current = true;
            //set current bar to 100 %
            animValuesBar[currentBarIndex.current].value = 100;
            currentBarIndex.current += 1;
            setRerender(prev => !prev);
            //again auto play from next index
            playStory(currentBarIndex.current);
        }
        //if last bar switch to next user's story
        if ((currentBarIndex.current == animValuesBar.length - 1) &&
            animValuesBar[currentBarIndex.current].value > 1
        ) {
            scrollToNextUserStory();
        }
    }

    const playPrev = () => {
        //if current is not the 1st bar
        if (currentBarIndex.current > 0) {
            //paused the auto play
            paused.current = true;
            //set current and prev bar to zero %
            resetAnimation(animValuesBar[currentBarIndex.current]);
            resetAnimation(animValuesBar[currentBarIndex.current - 1]);
            currentBarIndex.current -= 1;
            setRerender(prev => !prev);
            //again auto play from prev index
            playStory(currentBarIndex.current);
        }
        //if 1st bar switch to prev user's story
        if (currentBarIndex.current == 0 &&
            animValuesBar[0].value < 99) {
            scrollToPrevUserStory();
        }
    }
    //pause current story
    const pauseStory = () => {
        paused.current = true;
        pauseBar(animValuesBar[currentBarIndex.current]);
    }

    //pause and reset current story
    const pauseAndResetStory = () => {
        paused.current = true;
        resetAnimation(animValuesBar[currentBarIndex.current]);
    }



    useEffect(() => {
        console.log(isVisible)
        //pause story when it is not visible on the screen
        //if user scrolls or scroll to the other screen 
        if (!isVisible && isPlaying.current) {
            isPlaying.current = false;
            runOnJS(pauseAndResetStory)();
            return;
        }

        //play story when it is visible on the screen 
        if (isVisible && !isPlaying.current) {
            isPlaying.current = true;
            runOnJS(playStory)();
        }
    }, [isVisible])

    // //this hooks runs every time whenever 
    // //at least one of the shared values or 
    // //state used in the function body changes
    // useDerivedValue(() => {

    //     const isVisible = scrollX.value.toFixed(0) ==
    //         (width * storyIndex).toFixed(0);


    //     //pause story when it is not visible on the screen
    //     //if user scrolls or scroll to the other screen 
    //     if (!isVisible && isPlaying.current) {
    //         isPlaying.current = false;
    //         runOnJS(pauseAndResetStory)();
    //         return;
    //     }

    //     //play story when it is visible on the screen 
    //     if (isVisible && !isPlaying.current) {
    //         isPlaying.current = true;
    //         runOnJS(playStory)();
    //     }

    // }, []);

    return {
        playStory,
        pauseStory,
        playNext,
        playPrev,
        currentBarIndex,
    };
} 