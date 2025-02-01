import React from 'react';
import { View, Image } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootStack/rootNavigation';
import IconIo from '@expo/vector-icons/Ionicons'
import ButtonRipple from '../../components/general/customButton/buttonRipple';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';

export default function HomeHeader() {

    const { styles, theme: { colors } } = useStyles(styleSheet);

    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";
    // const dispatch = useAppDispatch();



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
                    style={{ marginRight: 10, borderRadius: 100, }}
                    onPress={() => navigation.navigate('Notifications')}
                >
                    <IconIo
                        name='heart-outline'
                        size={25}
                        color={colors.secondary1}
                    />
                </ButtonRipple>
                <ButtonRipple
                    onPress={() => navigation.navigate('Inbox')}
                    style={{ borderRadius: 100, }}
                >
                    <IconIo
                        name='chatbubble-ellipses-outline'
                        size={25}
                        color={colors.secondary1}
                    />
                </ButtonRipple>
            </View>
        </View>
    );
}

