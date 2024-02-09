import React from "react";
import { View } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { useAppThemeColors } from "../../utils/functions/responsiveUtils";
import { TouchableRipple } from "react-native-paper";
import { showDismissAlert } from "../../components/general/alerts/dismissAlert";
import ButtonRipple from "../../components/general/customButton/buttonRipple";

export const AddContentButton = () => {
    const colors = useAppThemeColors();
    return (
        <ButtonRipple
            onPress={() => {
                showDismissAlert({
                    title: 'Feature is on hold!',
                    description:''
                })
            }}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <IconAnt
                name="pluscircleo"
                color={colors.grey1}
                size={25}
            />
        </ButtonRipple>
    )
}