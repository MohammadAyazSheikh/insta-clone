import React, { useCallback, useEffect, useState } from 'react';
import {
    Modal, ActivityIndicator, TextProps,
    ActivityIndicatorProps, ViewStyle, View,
    FlatList,
    Image
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { Text, TouchableRipple } from 'react-native-paper';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import { TextBold, TextRegular } from '../text/text';
import TextBox from '../textBox/textBox';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { countiesInfo, countiesInfoType } from '../../../constants/data/countriesInfo';
import { SvgUri } from 'react-native-svg';
import { onEnd, onStart, paginateData } from '../../../utils/functions/pagination';


type loaderType = {
    show: boolean,
    onClose: () => void,
    onPress: (country: countiesInfoType) => void;
    containerStyles?: ViewStyle,
    bodyStyles?: ViewStyle,
    backDropStyles?: ViewStyle,
}
const pageSize = 15;
const CountryCodePicker = ({
    show,
    onClose,
    onPress = () => '',
    containerStyles,
    bodyStyles,
    backDropStyles,

}: loaderType) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const colors = useAppThemeColors();
    const [filteredCountries, setFilteredCountries] = useState<countiesInfoType[]>(countiesInfo);

    const [paginatedCountries, setPaginatedCountries] = useState<countiesInfoType[]>(countiesInfo);
    const [currentPage, setCurrentPage] = useState(1);


    // pagination for countries
    useEffect(() => {
        const paginatedData = paginateData<countiesInfoType>(filteredCountries, pageSize, 1);
        setPaginatedCountries(paginatedData);
        //setting it 1st page when ever user search new value
        setCurrentPage(1);
    }, [filteredCountries]);

    // code component
    const Code = useCallback(({ countryInfo, showFlag, onPress }:
        {
            countryInfo: countiesInfoType,
            showFlag?: boolean, onPress: () => void
        }) => (
        <TouchableRipple
            onPress={onPress}
            style={styles.listStyle}
        >
            <>
                {
                    showFlag ?
                        <SvgUri
                            width={40}
                            height={20}
                            style={{ marginRight: 5 }}
                            uri={countryInfo.flag!}
                        />
                        :
                        null
                }
                <TextRegular
                    style={{
                        fontSize: 16,
                        color: colors.secondary1
                    }}
                >
                    {`${countryInfo.emoji} ${countryInfo.name}  (+${countryInfo.callingCode})`}
                </TextRegular>
            </>
        </TouchableRipple>
    ), []);

    // flat list render data
    const renderCodes = useCallback(({ item }: { item: countiesInfoType }) => (
        <Code
            countryInfo={item}
            // showFlag={true}
            onPress={() => {
                onPress(item);
            }}
        />
    ), [])

    return (
        <View style={styles.centeredView}>
            <Modal
                onRequestClose={() => {
                    onClose();
                }}
                animationType="slide"
                transparent={true}
                visible={show}
            >
                <View
                    style={[styles.backDrop, backDropStyles]}
                />
                {/* ------- header ------- */}
                <View style={[styles.container, containerStyles]}     >
                    <View style={[styles.body, bodyStyles]}>
                        <View style={styles.headerView}>
                            <TextBold style={{
                                color: colors.secondary1,
                                fontSize: 18
                            }}>
                                SELECT YOUR COUNTRY
                            </TextBold>
                        </View>
                        <View style={styles.contentView}>
                            {/* search bar */}
                            <TextBox
                                placeholder='Type country name'
                                containerStyle={{ width: "100%" }}
                                inputViewStyle={{ width: '100%' }}
                                inputViewFocusStyle={{ borderWidth: 0, }}
                                onChangeText={(value) => {
                                    const val = value.toLocaleLowerCase();
                                    // setSearchedText(value);
                                    const filterData = countiesInfo.filter(cn => {
                                        if (cn.name?.toLocaleLowerCase().includes(val) ||
                                            cn.callingCode?.toLocaleLowerCase().includes(val) ||
                                            cn.nameCode?.toLocaleLowerCase().includes(val))
                                            return cn;
                                    });

                                    setFilteredCountries(filterData);
                                }}
                                iconLeft={<IconAnt
                                    name='search1'
                                    color={colors.grey1}
                                    size={25}
                                />}
                            />
                            {/* ----List----- */}
                            <FlatList
                                style={styles.scrollView}
                                data={paginatedCountries}
                                keyExtractor={(item) => item.nameCode! + item.callingCode}
                                renderItem={renderCodes}
                                onEndReachedThreshold={0}
                                // onStartReached={() => {
                                //     console.log('👆');
                                //     onStart(
                                //         filteredCountries,
                                //         paginatedCountries,
                                //         setPaginatedCountries,
                                //         currentPage,
                                //         setCurrentPage,
                                //         pageSize
                                //     );
                                // }}
                                onEndReached={() => {
                                    console.log('👇');
                                    onEnd(
                                        filteredCountries,
                                        paginatedCountries,
                                        setPaginatedCountries,
                                        currentPage,
                                        setCurrentPage,
                                        pageSize
                                    );
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    );
};
export default CountryCodePicker;