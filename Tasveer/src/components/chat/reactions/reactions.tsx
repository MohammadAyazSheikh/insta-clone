import React, { createRef, forwardRef, useImperativeHandle, useState } from 'react';
import { View, Modal, Pressable } from 'react-native';
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { Text } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

const emojis = ['👍', '❤', '😂', '😲', '😢', '😡']
export type emojisType = '👍' | '❤' | '😂' | '😲' | '😢' | '😡'
type props = {

    onSelect: (emoji: string) => void,
    selected: string,
}

type modalProp = {
    show: (prop: props) => void
}


//ref to the component
const modalRef = createRef<modalProp>();

const Reactions = forwardRef(({

}, ref) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const [visible, setVisible] = useState(false);
    const [props, setProps] = useState<props>();

    //below function allows us to set internal stats using ref
    useImperativeHandle(ref, () => {
        return ({
            show: (props_: props) => {
                setVisible(true);
                setProps(props_)
            },
        });
    })

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            {/* backdrop */}
            <Pressable
                style={styles.backDrop}
                onPress={() => {
                    setVisible(false)
                }}
            />
            <View style={styles.container}>
                {
                    emojis.map((em, index) =>
                        <Animated.View
                            key={em}
                            entering={ZoomIn.delay(index * 50)
                                .springify()
                                .stiffness(110)
                            }
                            style={[styles.emojiView, em == props?.selected && styles.emojiActive]}
                        >
                            <ButtonRipple
                                onPress={() => {
                                    props?.onSelect(em)!;
                                    setVisible(false)
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 25,
                                        color: 'white'
                                    }}
                                >
                                    {em}
                                </Text>
                            </ButtonRipple>
                        </Animated.View>
                    )
                }
            </View>
        </Modal >
    );
});






export const showReaction = ({ onSelect, selected }: props) => {
    modalRef?.current &&
        modalRef?.current?.show({
            onSelect,
            selected
        })
}

export const RenderReaction = () => (<Reactions ref={modalRef} />);
export default Reactions;