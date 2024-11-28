import { SectionList, SectionListData, View } from "react-native";
import { useCallback, useState } from "react";
import styleSheet from "./styles/styles";
import { useStyles } from "react-native-unistyles";
import { RootStackProps } from "../../routes/rootStack/rootNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/general/screenHeaders/header";
import SearchBar from "../../components/general/searchbars/searchbar";
import { getMenu, itemType, MenuListDataType } from "./menuList";
import MenuItem from "./menuItem";
import { TextBold, TextRegular } from "../../components/general/text/text";
import ButtonRipple from "../../components/general/customButton/buttonRipple";
import { useAppDispatch } from "../../redux/hooks";
import { logoutSuccess } from "../../redux/features/user/userSlice";



const Setting = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();

    const dispatch = useAppDispatch()

    const { styles, theme: { spacing } } = useStyles(styleSheet);

    const menuList = getMenu();
    const [list, setList] = useState(menuList)
    //getting data for list
    // const menuList = getMenu();

    //function to render item
    const renderItem = useCallback(({ item }: { item: MenuListDataType }) => (
        <MenuItem
            title={item.title}
            Icon={item.Icon}
            onPress={() => ""}
        />
    ), [list]);

    //function to render header
    const renderHeader = useCallback(({ section: { title } }: { section: SectionListData<MenuListDataType, itemType> }) => (
        <View style={styles.itemHeaderContainer}>
            <TextBold style={styles.txtHeader}>{title}</TextBold>
        </View>
    ), []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* header */}
                <Header
                    title="Settings and activity"
                />
                <SectionList
                    renderSectionHeader={renderHeader}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={
                        <View style={{ paddingHorizontal: spacing?.lg, marginBottom: 20 }}>
                            <SearchBar
                                onChangeText={(value) => {
                                    if (!value) {
                                        setList(menuList)
                                        return;
                                    }

                                    const filteredSection = menuList.map(data => {
                                        const filteredList = data.data.filter(item => 
                                            item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
                                        return {
                                            ...data,
                                            data: filteredList,
                                        }
                                    }).filter(list => list.data.length > 0);

                                    setList(filteredSection)
                                }}
                            />
                        </View>
                    }
                    ListFooterComponent={
                        <ButtonRipple
                            style={styles.itemHeaderContainer}
                            onPress={() => dispatch(logoutSuccess())}
                        >
                            <TextRegular style={styles.txtLogout}>Logout</TextRegular>
                        </ButtonRipple>
                    }
                    contentContainerStyle={styles.scroll}
                    sections={list}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )

};

export default Setting;