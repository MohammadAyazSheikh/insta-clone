import React from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";
import styleSheet from "./styles/styles";
import { TextRegular } from "../../components/general/text/text";
import ButtonRipple from "../../components/general/customButton/buttonRipple";
import IconAnt from '@expo/vector-icons/AntDesign';

export type props = {
    title: string,
    Icon: React.ReactNode,
    onPress: () => void,
}

const MenuItem = ({ title, Icon, onPress }: props) => {
    const { styles, theme: { colors } } = useStyles(styleSheet);
    return (
        <ButtonRipple style={styles.itemContainer} onPress={onPress}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                {Icon}
                <TextRegular style={styles.txtItem}>
                    {title}
                </TextRegular>
            </View>
            <IconAnt
                name="right"
                size={24}
                color={colors.secondary1}
            />
        </ButtonRipple>
    )
}

export default MenuItem;