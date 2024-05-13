import React, { useRef, useState, useCallback } from 'react';
import { View, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useAppThemeColors, useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import IconMt from 'react-native-vector-icons/MaterialIcons';
import { getCurrentCoord, autoComplete } from '../../../utils/permissions/locationPermission';
import { useEffect } from 'react';
import { Divider } from 'react-native-paper';
import { debounce } from 'lodash';
import Header from '../screenHeaders/header';
import CustomButton from '../customButton/customButton';
import { TextRegular } from '../text/text';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const initialRegion = {
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.0001,
}

type coordType = {
    latitude: number,
    longitude: number,
    address?: string,
}
type props = {
    isOpen: boolean,
    onClose: () => void,
    onSend: () => void,
    setCoord: (coord: coordType) => void,
    coord: coordType
}
const LocationMapSelector = ({
    isOpen,
    onClose,
    coord,
    setCoord,
    onSend }: props) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors()
    const [data, setData] = useState([]);


    const mapRef = useRef(null);

    useEffect(() => {
        getCurrentCoord((coord) => {
            console.log(coord)
            setCoord({ ...initialRegion, ...coord })
        });
    }, []);





    useEffect(() => {
        mapRef.current?.animateToRegion(
            coord
        )
    }, [coord]);



    const searchHandler = useCallback(debounce((value) => {
        autoComplete(value)
            .then(data => {
                setData(data?.features);
            })
            .catch(err => {
                console.error(JSON.stringify(err, null, 3))
            })
    }, 300), [])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => {
                onClose && onClose();
            }}
        >
            <SafeAreaProvider>
                <SafeAreaView style={styles.centeredView}>
                    <View style={[styles.modalView]}>
                        {/* ------header--- */}
                        <Header
                            title={"Select Location"}
                            onPressLeft={() => {
                                onClose && onClose()
                            }}
                        />
                        <View style={styles.containerMap}>
                            {/* ---map---- */}

                            <MapView
                                ref={mapRef}
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map}
                                initialRegion={initialRegion}
                                // scrollEnabled={!(data?.length > 0)}
                                zoomEnabled
                                rotateEnabled
                            >
                                <Marker coordinate={coord} />

                            </MapView>

                            <View style={styles.inputView}>
                                <View style={styles.inputViewInner}>
                                    {/* input search */}
                                    <TextInput
                                        style={styles.txtInput}
                                        placeholder='Search location'
                                        placeholderTextColor={colors.grey1}
                                        onChangeText={(value => {
                                            searchHandler(value);
                                            if (!value) {
                                                setData([])
                                            }
                                        })}
                                    />
                                    {/* location button */}
                                    <TouchableOpacity style={styles.locationIconView}
                                        onPress={() => getCurrentCoord((coord) => {
                                            setCoord({ ...initialRegion, ...coord })
                                        })}
                                    >
                                        <IconMt
                                            name='my-location'
                                            size={20}
                                            color={"white"}
                                        />
                                    </TouchableOpacity>
                                    {/* --------------suggestionView-------------- */}
                                    {
                                        data?.length > 0 ?
                                            <View style={styles.suggestionView}>
                                                <ScrollView >
                                                    {
                                                        data?.map((item, index) => (
                                                            <View key={index + item?.properties?.place_id}>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        setCoord({
                                                                            ...initialRegion,
                                                                            longitude: item.properties?.lon,
                                                                            latitude: item.properties?.lat,
                                                                            address: item.properties?.formatted,
                                                                        });
                                                                        setData([]);
                                                                    }}
                                                                    style={styles.txtSuggestionView}

                                                                >
                                                                    <TextRegular
                                                                        style={styles.txtSuggestion}
                                                                        numberOfLines={1}

                                                                    >
                                                                        {item.properties?.formatted}
                                                                    </TextRegular>
                                                                </TouchableOpacity>
                                                                <Divider />
                                                            </View>
                                                        ))
                                                    }
                                                </ScrollView>
                                            </View>
                                            : null
                                    }
                                </View>
                            </View>
                            {/* Send Button */}
                            <CustomButton
                                buttonText='Send Location'
                                onPress={onSend}
                                style={{ width: '90%' }}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </Modal>
    )
}
export default LocationMapSelector;