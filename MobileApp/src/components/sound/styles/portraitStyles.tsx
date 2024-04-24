
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../theme/colors';
import { getShadow } from '../../../theme/platformSpecificStyles';


type p = (number: number) => number;

const portraitStyles = (w: p, h: p, colors: colorObjectType) => {

  return StyleSheet.create({
    container: {

    },
    btnRecorder: {
      width:w(10),
      aspectRatio:1,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 100,
      backgroundColor: colors.ternary1,
      marginLeft: 10,
    },
    iconLock: {
      width:w(10),
      aspectRatio:1,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 100,
      backgroundColor: "tomato",
      position:'absolute',
      transform:[
        // {scale:1},
      // {translateY:-200}
    ],
     
    },
  });
}

export default portraitStyles;



