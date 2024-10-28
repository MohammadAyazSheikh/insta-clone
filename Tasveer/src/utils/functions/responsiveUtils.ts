import React, { useState, useEffect, } from 'react';
import { Dimensions, PixelRatio, ScaledSize, useWindowDimensions ,
    // LayoutAnimation,Platform,UIManager
} from 'react-native';
let { width, height } = Dimensions.get('window');
import { useAppSelector } from '../../redux/hooks';
import colors_, { colorObjectType, darkColors, lightColors } from '../../theme/colors';

// if (
//     Platform.OS === 'android' &&
//     UIManager.setLayoutAnimationEnabledExperimental
//   ) {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
//   }

export type dpFunctionTpe = (num: number) => number;
export type stylesObjType = {
    screenInfo: ScaledSize,
    widthToDp: dpFunctionTpe,
    heightToDp: dpFunctionTpe,
    isPortrait: boolean,
    theme: "dark" | "light" | "default",
    colors: colorObjectType
}

export const useAppThemeColors = () => {
    const theme = useAppSelector(state => state.theme);
    const colors = theme.theme == "dark" ?
        {
            ...colors_,
            ...darkColors,
        }
        :
        {
            ...colors_,
            ...lightColors,
        }
    return colors;
}

//-------------For functional component--------------------------
export const useFunctionalOrientation = (callBack: Function) => {


    const theme = useAppSelector(state => state.theme);
    const colors = useAppThemeColors()
    // const [screenInfo, setScreenInfo] = useState(Dimensions.get('window'));
    const screenInfo = useWindowDimensions();
    const isPortrait = screenInfo.height > screenInfo.width;

    //un comment this i we want to animation when cell rotate
    // useEffect(()=>{
    //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // },[isPortrait])

    const widthToDp = (number: number) => {
        let givenWidth = typeof number === 'number' ? number : parseFloat(number);
        return PixelRatio.roundToNearestPixel((screenInfo.width * givenWidth) / 100);
    }


    const heightToDp = (number: number) => {
        let givenHeight = typeof number === 'number' ? number : parseFloat(number);
        return PixelRatio.roundToNearestPixel((screenInfo.height * givenHeight) / 100);
    }


    //old with event listener
    // useEffect(() => {
    //     const onScreenChange = () => {
    //         // setScreenInfo(change.screen);
    //         setScreenInfo(Dimensions.get('window'))
    //     }
    //     const listener = Dimensions.addEventListener('change', onScreenChange);
    //     return () => { return listener.remove(); }
    // }, [])


    return {
        ...screenInfo,
        isPortrait: isPortrait,
        widthToDp: widthToDp,
        heightToDp: heightToDp,
        styles: callBack({ screenInfo, widthToDp, heightToDp, isPortrait, theme: theme.theme, colors: colors })
    };

}


// // ----------------------------For Class Component---------------------------------------

// type classOrientationType = {
//     setState:Function,
//     listener:{
//         remove:Function
//     }
// }
// export const orientationListener = (self:classOrientationType ) => {



//     const onScreenChange = () => {

//         self.setState({
//             // screenInfo: change.screen,
//             screenInfo: Dimensions.get('window')
//         })
//     }

//     const listenTpOrientationChanges = () => {

//         self.listener = Dimensions.addEventListener('change', onScreenChange);
//     }

//     const removeOrientationChanges = () => {
//         return self.listener.remove()
//     }


//     return {
//         addOrientationListener: listenTpOrientationChanges,
//         removeOrientationListener: removeOrientationChanges,
//     };

// }

// export const useClassOrientation = (self, callBack) => {


//     const widthToDp = (number) => {

//         let givenWidth = typeof number === 'number' ? number : parseFloat(number);
//         return PixelRatio.roundToNearestPixel((self.state.screenInfo.width * givenWidth) / 100);

//     }


//     const heightToDp = (number) => {

//         let givenHeight = typeof number === 'number' ? number : parseFloat(number);
//         return PixelRatio.roundToNearestPixel((self.state.screenInfo.height * givenHeight) / 100);

//     }
//     const isPortrait = self.state.screenInfo.height > self.state.screenInfo.width;
//     return {
//         ...self.state.screenInfo,
//         isPortrait: isPortrait,
//         styles: callBack(self.state.screenInfo, widthToDp, heightToDp, isPortrait),
//     }
// }



export const widthToDp = (number: number) => {

    let givenWidth = typeof number === 'number' ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);

}


export const heightToDp = (number: number) => {

    let givenHeight = typeof number === 'number' ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);

}