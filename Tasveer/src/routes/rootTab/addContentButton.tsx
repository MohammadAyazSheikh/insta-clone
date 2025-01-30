import React from "react";
import IconAnt from '@expo/vector-icons/AntDesign';
import { useAppThemeColors } from "../../utils/functions/responsiveUtils";
import ButtonRipple from "../../components/general/customButton/buttonRipple";
import openEditor from "../../components/imageEditor/imageEditor";


export const AddContentButton = () => {
    const colors = useAppThemeColors();
    return (
        <ButtonRipple
            onPress={async () => {
                const uri = await openEditor();
                console.log("Edited Image Uri: ", uri)
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