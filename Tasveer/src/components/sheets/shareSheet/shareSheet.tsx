import React, { forwardRef, useCallback, useState } from 'react';
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFn from 'react-native-vector-icons/Fontisto';
import IconOct from 'react-native-vector-icons/Octicons';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import SheetWrapper, { sheetWrapperProps } from '../sheetWrapper/sheetWrapper';
import { Easing, FlatListComponent, StyleSheet, TextInput, View } from 'react-native';
import { useAppThemeColors, useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { TextBold, TextRegular } from '../../general/text/text';
import UserAvatar from '../../general/avatar/avatar';
import { useAppSelector } from '../../../redux/hooks';
import { commentType, userType } from '../../../constants/types/sharedTypes';
import SearchBar from '../../general/searchbars/searchbar';
import { users } from '../../../constants/data/usersData';
import CustomButton from '../../general/customButton/customButton';

type optionBtnProp = {
  icon: React.ReactNode,
  title: string,
  onPress: () => void,
}


type sheetProps = {

} & Omit<sheetWrapperProps, 'children'>

const CommentSheet = forwardRef<BottomSheet, sheetProps>(({

  ...rest
}, ref) => {

  const { user } = useAppSelector(state => state.user);
  const { styles } = useFunctionalOrientation(responsiveStyles);
  const colors = useAppThemeColors()
  const [text, setText] = useState<string>();
  const [userList, setUserList] = useState(users);
  const [selectedUsers, setSelectedUsers] = useState<userType[]>([]);

  //options Button
  const OptionButton = useCallback(({
    title,
    icon,
    onPress
  }: optionBtnProp) => (
    <UserAvatar
      name={title}
      showName
      size={50}
      containerStyle={{ width: 'auto', marginHorizontal: 10 }}
      icon={icon}
      onPress={onPress}
    />
  ), [])



  // render user list function
  const renderUsers = ({ item }: any) => {

    const user = selectedUsers.find(u_ => u_.id == item.id);

    return (
      <View style={styles?.container}>
        <UserAvatar
          selected={Boolean(user)}
          name={item.firstName}
          showName
          onPress={() => {
            if (user) {
              const u = selectedUsers?.filter(u => u.id != item?.id);
              setSelectedUsers(u);
            }
            else {
              setSelectedUsers([item, ...selectedUsers])
            }
          }}
        />
      </View>)
  }
  return (
    <SheetWrapper {...rest} ref={ref}>
      {/*---------------------- searchBar --------------*/}
      <View style={styles?.row}>
        <SearchBar
          onChangeText={(value) => {
            if (value) {
              const users_ = users.filter(u =>
                u.firstName?.includes(value?.toLowerCase()) ||
                u.lastName?.includes(value?.toLowerCase()) ||
                u.userName?.includes(value?.toLowerCase())
              );

              setUserList(users_);
            }
            else {
              setUserList(users);
            }
          }}
          onClear={() => setUserList(users)}
        />
      </View>
      {/* ----------------------user list-------------------- */}
      <BottomSheetFlatList
        numColumns={3}
        contentContainerStyle={styles?.scroll}
        data={userList}
        renderItem={renderUsers}
      />
      {/*------------------------footer---------------- ------ */}
      {
        // ----- send button and input -----
        selectedUsers?.length > 0 ?
          <View style={styles.col}>
            <TextInput
              placeholder='Write a message'
              placeholderTextColor={colors.grey1}
              style={styles.inputStyle}
            />
            <CustomButton
              style={styles.btnSendStyle}
              buttonText='Send'
            />
          </View>
          :
          //------ options ------
          <View style={[styles?.row,
          { paddingVertical: 10 }]}>

            <BottomSheetScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {/*copy button  */}
              <OptionButton
                title='Copy link'
                icon={<IconFn
                  size={24}
                  name='link'
                  color={colors.secondary1}
                />}
                onPress={() => { }}
              />
              {/*share button  */}
              <OptionButton
                title='Share'
                icon={<IconOct
                  size={24}
                  name='share-android'
                  color={colors.secondary1}
                />}
                onPress={() => { }}
              />
              {/*story button  */}
              <OptionButton
                title='Add to story'
                icon={<IconOct
                  size={24}
                  name='plus-circle'
                  color={colors.secondary1}
                />}
                onPress={() => { }}
              />
              {/*whatsapp button  */}
              <OptionButton
                title='Whatsapp'
                icon={<IconFn
                  size={24}
                  name='whatsapp'
                  color={colors.secondary1}
                />}
                onPress={() => { }}
              />
              {/*facebook button  */}
              <OptionButton
                title='Facebook'
                icon={<IconMtc
                  size={24}
                  name='facebook'
                  color={colors.secondary1}
                />}
                onPress={() => { }}
              />
              {/*SMS button  */}
              <OptionButton
                title='SMS'
                icon={<IconAnt
                  size={24}
                  name='message1'
                  color={colors.secondary1}
                />}
                onPress={() => { }}
              />
              {/*twitter button  */}
              <OptionButton
                title='Twitter'
                icon={<IconAnt
                  size={24}
                  name='twitter'
                  color={colors.secondary1}
                />}
                onPress={() => { }}
              />
              {/*snapchat button  */}
              <OptionButton
                title='Snapchat'
                icon={<IconFn
                  size={22}
                  name='snapchat'
                  color={colors.secondary1}
                />}
                onPress={() => { }}
              />
            </BottomSheetScrollView>

          </View>
      }
    </SheetWrapper>
  );
});

export default CommentSheet;
