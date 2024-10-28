
import { StyleSheet } from 'react-native';
import { colorObjectType } from '../../../../theme/colors';
import { fontFamily } from '../../../../theme/fonts';

type p = (number: number) => number;

const landscapeStyles = (w: p, h: p, colors: colorObjectType) => {

    return StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          modalView: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.secondary1,
            borderRadius: 10,
            padding: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 10,
          },
          modalImg: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            borderRadius: 10,
          },
          modalImgContainer: {
            width: h(90),
            height: w(60),
            borderRadius: 10,
          },
          SliderView: {
            width: h(90),
            height: w(60),
            borderRadius: 10,
          },
          btnStyle: {
            padding: 3,
            borderRadius: 20,
            backgroundColor: colors.primary1,
            position: 'absolute',
            left: 20,
            top: 20,
          },
    });
}

export default landscapeStyles;



