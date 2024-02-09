import React from 'react';
import { View, Image } from 'react-native';
import { useAppThemeColors, useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons'
import ButtonRipple from '../../components/general/customButton/buttonRipple';

export default function HomeHeader() {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const colors = useAppThemeColors();
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";
    const dispatch = useAppDispatch();



    return (
        <View style={styles.headerView}>
            <Image
                source={
                    isDark ?
                        require('../../../assets/images/logo-light.png')
                        :
                        require('../../../assets/images/logo-dark.png')
                }
                style={styles.logoStyles}
            />
            <View style={styles.row}>
                <ButtonRipple
                    onPress={() => ''}
                    style={{ marginRight: 10, borderRadius: 100, }}
                >
                    <IconMtc
                        name='cards-heart'
                        size={25}
                        color={colors.secondary1}
                    />
                </ButtonRipple>
                <ButtonRipple
                    onPress={() => ''}
                    style={{ borderRadius: 100, }}
                >
                    <IconMtc
                        name='facebook-messenger'
                        size={25}
                        color={colors.secondary1}
                    />
                </ButtonRipple>
            </View>
        </View>
    );
}

