import React from 'react';
import { messageObjType } from '../../../constants/types/sharedTypes';
import BubbleWrapper from '../bubbleWrapper/bubbleWrapper';
import { WebView } from 'react-native-webview';
import { getMapPageHtml } from './mapHtml';
import { View, StyleSheet, Platform, Linking } from 'react-native';
import { showConfirmAlert } from '../../general/alerts/confirmAlert';
import { TextRegular } from '../../general/text/text';
import styleSheet from './styles/styles';
import { useStyles } from 'react-native-unistyles';
type propsType = {
    message: messageObjType,
    onPress?: () => void,
    onLongPress?: () => void,
}


export default function LocationBubble(props: propsType) {

    const { styles } = useStyles(styleSheet);

    const { message } = props;
    const { latitude, longitude, address } = message?.location!;

    return (
        <BubbleWrapper
            {...message}
            onPress={() => {

                props?.onPress && props?.onPress()


                //opening map
                const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
                const latLng = `${latitude},${longitude}`;
                const label = `Locate ${message?.user?.firstName}`;
                const url = Platform.select({
                    ios: `${scheme}${label}@${latLng}`,
                    android: `${scheme}${latLng}(${label})`
                });
                showConfirmAlert({
                    title: 'Open map?',
                    description: '',
                    onConfirm: () => {
                        Linking.openURL(url!);
                    }
                })


            }}
            onLongPress={props?.onLongPress}
        >
            {/* Rendering location webview because it is light weight as compared to map package */}
            <View>
                <WebView
                    source={{
                        html: getMapPageHtml({
                            latitude,
                            longitude
                        })
                    }}
                    style={styles.webView}
                />
                {/* for preventing user to touch  map  */}
                <View
                    style={{ ...StyleSheet.absoluteFillObject, zIndex: 1, }}
                />
            </View>
            {/* ---address-- */}
            {
                address ?
                    <View style={styles.texView}>
                        <TextRegular style={styles.textLocation}>
                            {address}
                        </TextRegular>
                    </View>
                    :
                    null
            }
        </BubbleWrapper>
    );
}

