import React from "react";
import { View } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { useAppThemeColors } from "../../utils/functions/responsiveUtils";
import { TouchableRipple } from "react-native-paper";
import { showDismissAlert } from "../../components/general/alerts/dismissAlert";
import ButtonRipple from "../../components/general/customButton/buttonRipple";
import { showConfirmAlert } from "../../components/general/alerts/confirmAlert";

export const AddContentButton = () => {
    const colors = useAppThemeColors();
    return (
        <ButtonRipple
            onPress={() => {
                showDismissAlert({
                    title: 'Inprogress!',
                    description:'We are working on it\nIt will be develop soon'
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