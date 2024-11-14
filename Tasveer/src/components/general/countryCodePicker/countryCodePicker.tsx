import React, { useCallback, useEffect, useState } from 'react';
import {
    Modal, ViewStyle, View,
    FlatList,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useAppThemeColors, widthToDp } from '../../../utils/functions/responsiveUtils';
import { TextBold, TextRegular } from '../text/text';
import TextBox from '../textBox/textBox';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { countiesInfo, countiesInfoType } from '../../../constants/data/countriesInfo';
import { SvgUri } from 'react-native-svg';
import { onEnd, paginateData } from '../../../utils/functions/pagination';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';
import { FlashList } from '@shopify/flash-list';
import ModalWrapper from '../../modals/modalWrapper';


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

    const { styles } = useStyles(styleSheet)
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
    ), [styles]);

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
        <ModalWrapper
            onRequestClose={onClose}
            onBackdropPress={onClose}
            animationType="slide"
            visible={show}
            showBackDrop
        >
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
                            // estimatedItemSize={300}
                            // style={styles.scrollView}
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
                                // console.log('👇');
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
        </ModalWrapper>
    );
};
export default CountryCodePicker;