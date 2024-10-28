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
import Animated, { ZoomIn } from 'react-native-reanimated';


type dismissAlertPropsType = {
    onDismiss?: () => void,
    dismissText?: string,
    confirmText?: string,
    title?: string,
    description?: string,
}

type dismissAlertType = {
    show?: (props: dismissAlertPropsType) => void,
    hide?: () => void,
}




//ref to the component
const modalRef = React.createRef<dismissAlertType>();


const ConfirmModal = React.forwardRef(({

}: dismissAlertType, ref) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";
    const [visible, setVisible] = useState(false);
    const [props, setProps] = useState<dismissAlertPropsType>({});


    //below function allows us to set internal stats using ref
    useImperativeHandle(ref, () => {
        return ({
            show: (values: dismissAlertPropsType) => {
                setProps({ ...values });
                setVisible(true);
            },
        });
    })

    return (

        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => {
                setVisible(false)
            }}
        >
            <View
                style={styles.backDrop}
            />
            <View style={styles.centeredView}>
                <Animated.View
                    entering={ZoomIn}
                    style={[styles.alertView, {
                        backgroundColor:
                            isDark ? colors.primary4 : "#FFF"
                    }]}>
                    <View style={styles.alertTextView}>
                        {
                            // ----title----
                            props.title ?
                                <TextBold style={[
                                    styles.txtAlertTitle,
                                    { color: colors.secondary1 }
                                ]}
                                    numberOfLines={1}
                                >
                                    {props.title}
                                </TextBold>
                                :
                                null
                        }
                        {
                            props.description ?
                                // ---- description ----
                                <TextRegular style={[
                                    styles.txtAlertSubTitle,
                                    { color: colors.grey1 }
                                ]}
                                    numberOfLines={3}
                                >
                                    {props.description}
                                </TextRegular>
                                :
                                null
                        }
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
                </Animated.View>
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

    //setting props
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