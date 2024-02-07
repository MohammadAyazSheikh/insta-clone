import React, { useImperativeHandle, useState } from 'react';
import {
    Modal, View
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import { TouchableRipple } from 'react-native-paper';
import { useAppSelector } from "../../../redux/hooks";
import { TextRegular, TextBold } from "../text/text";



type confirmAlertPropsType = {
    onDismiss?: () => void,
    dismissText?: string,
    confirmText?: string,
    title?: string,
    description?: string,
}

type confirmAlertType = {
    show?: (props: confirmAlertPropsType) => void,
    hide?: () => void,
}




//ref to the component
const modalRef = React.createRef<confirmAlertType>();


const ConfirmModal = React.forwardRef(({

}: confirmAlertType, ref) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";
    const [visible, setVisible] = useState(false);
    const [props, setProps] = useState<confirmAlertPropsType>({});


    //below function allows us to set internal stats using ref
    useImperativeHandle(ref, () => {
        return ({
            show: (values: confirmAlertPropsType) => {
                setProps({ ...values });
                setVisible(true);
            },
        });
    })

    return (

        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setVisible(false)
            }}
        >
            <View
                style={styles.backDrop}
            />
            <View style={styles.centeredView}>
                <View style={[styles.alertView, {
                    backgroundColor:
                        isDark ? colors.primary4 : "#FFF"
                }]}>
                    <View style={styles.alertTextView}>
                        <TextBold style={[
                            styles.txtAlertTitle,
                            { color: colors.secondary1 }
                        ]}
                            numberOfLines={1}
                        >
                            {props.title}
                        </TextBold>
                        <TextRegular style={[
                            styles.txtAlertSubTitle,
                            { color: colors.grey1 }
                        ]}
                            numberOfLines={3}
                        >
                            {props.description}
                        </TextRegular>
                    </View>
                    {/* dismiss button */}
                    <TouchableRipple
                        rippleColor={
                            isDark ?
                                'rgba(255,255,255,0.2)'
                                :
                                'rgba(000,000,000,0.2)'
                        }
                        borderless
                        onPress={() => {
                            props?.onDismiss && props?.onDismiss();
                            setVisible(false);
                        }}
                        style={[styles.alertBtn, { borderTopColor: colors.primary3 }]}>
                        <TextBold style={[{ color: colors.ternary1, fontSize: 16 }]}>
                            {props?.dismissText}
                        </TextBold>
                    </TouchableRipple>
                </View>
            </View>
        </Modal >

    );
});




//call this component in App.js
export const RenderDismissAlert = () => (
    <ConfirmModal
        ref={modalRef}
    />
)


//use this function to show alert/modal every where in the app imperatively
export const showDismissAlert = ({
    title = 'App Message',
    description = 'Developer wants to say you hello 👋',
    dismissText = 'Dismiss',
    confirmText = 'Confirm',
    onDismiss = () => { },
}) => {

    // //setting props
    modalRef.current?.show
        &&
        modalRef.current?.show({
            title,
            description,
            dismissText,
            confirmText,
            onDismiss,
        });
}