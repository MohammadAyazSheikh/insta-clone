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
// import Animated, { ZoomIn } from 'react-native-reanimated';



type msgAlertPropsType = {
    onUnsend?: () => void,
    onDelete?: () => void,
    onDismiss?: () => void,
    title?: string,
    description?: string,
}

type msgAlertType = {
    show?: (props: msgAlertPropsType) => void,
}




//ref to the component
const modalRef = React.createRef<msgAlertType>();


const MessageAlertModal = React.forwardRef(({

}: msgAlertType, ref) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();
    const { theme } = useAppSelector(state => state.theme);
    const isDark = theme == "dark";
    const [visible, setVisible] = useState(false);
    const [props, setProps] = useState<msgAlertPropsType>({});
    //for react
    const [show, setShow] = useState(false);

    //below function allows us to set internal stats using ref
    useImperativeHandle(ref, () => {
        return ({
            show: (values: msgAlertPropsType) => {
                setProps({ ...values });
                setVisible(true);
            },
        });
    })

    return (
        <View>
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
                        <View style={[styles.alertTextView]}>
                            {
                                //    title
                                props.title ?
                                    <TextBold style={[
                                        styles.txtAlertTitle,
                                    ]}
                                        numberOfLines={1}
                                    >
                                        {props.title}
                                    </TextBold>
                                    :
                                    null
                            }
                            {
                                //description
                                props.description ?
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
                        {/* unsend button */}
                        <TouchableRipple
                            rippleColor={
                                isDark ?
                                    'rgba(255,255,255,0.2)'
                                    :
                                    'rgba(000,000,000,0.2)'
                            }
                            borderless
                            onPress={() => {
                                props?.onUnsend && props?.onUnsend();
                                setVisible(false);
                            }}
                            style={[styles.alertBtn, { borderTopColor: colors.grey1 }]}>
                            <TextRegular style={[{ color: colors.ternary1, fontSize: 16 }]}>
                                Delete for everyone
                            </TextRegular>
                        </TouchableRipple>
                        {/* delete button */}
                        <TouchableRipple
                            rippleColor={
                                isDark ?
                                    'rgba(255,255,255,0.2)'
                                    :
                                    'rgba(000,000,000,0.2)'
                            }
                            borderless
                            onPress={() => {
                                props?.onDelete && props?.onDelete();
                                setVisible(false);
                            }}
                            style={[styles.alertBtn, { borderTopColor: colors.grey1 }]}>
                            <TextRegular style={[{ color: colors.ternary1, fontSize: 16 }]}>
                                Delete for you
                            </TextRegular>
                        </TouchableRipple>
                        
                       

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
                            style={[styles.alertBtn, { borderTopColor: colors.grey1 }]}>
                            <TextRegular style={[{ color: colors.grey1, fontSize: 16 }]}>
                                Dismiss
                            </TextRegular>
                        </TouchableRipple>
                    </Animated.View>
                </View>
            </Modal >
           
        </View>
    );
});




//call this component in App.js
export const RenderMsgAlert = () => (
    <MessageAlertModal
        ref={modalRef}
    />
)


//use this function to show alert/modal every where in the app imperatively
export const showMsgAlert = ({
    title = 'Options',
    description = 'Select options',
    onDelete = () => { },
    onUnsend = () => { },
    onDismiss = () => { },
}: msgAlertPropsType) => {

    // //setting props
    modalRef.current?.show
        &&
        modalRef.current?.show({
            title,
            description,
            onDelete,
            onUnsend,
            onDismiss,
        });
}