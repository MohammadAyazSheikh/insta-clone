import React from 'react';
import {
    ViewStyle,
    TextStyle,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
// import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import ButtonRipple from '../../general/customButton/buttonRipple';
import {  TextRegular } from '../../general/text/text';



export type menuProps = {
    title: string,
    icon?: React.ReactNode,
    onPress?: () => void,
    containerStyle?: ViewStyle,
    titleStyle?: TextStyle,
}

const Menu = ({
    title,
    icon,
    titleStyle,
    containerStyle,
    onPress,
}: menuProps) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    // const colors = useAppThemeColors();


    return (
        <ButtonRipple style={[styles.menuContainer, containerStyle]}
            onPress={onPress}
        >
            {
                icon
            }
            <TextRegular style={[
                styles.txtMenu,
                icon ? { marginLeft: 10 } : {},
                titleStyle
            ]}>
                {title}
            </TextRegular>
        </ButtonRipple>
    );
}

export default Menu;
