import React, { useState } from 'react';
import { View } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import { TextRegular } from '../../general/text/text';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMt from 'react-native-vector-icons/MaterialIcons';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import SearchBarAnimated from '../../general/screenHeaders/searchBarAnimated';
import { RootStackProps } from '../../../routes/rootStack/rootNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import ChatHeaderMenu from './chatHeaderMenu';
import { removeAllSelectedMsgs } from '../../../redux/features/ui/uiSlice';
import { messageObjType } from '../../../constants/types/sharedTypes';
import { updateMessages } from '../../../redux/features/chat/chatSlice';
import { showMsgAlert } from '../../general/alerts/messageOptionsAlert';
import UserAvatar from '../../general/avatar/avatar';



type appHeaderProps = {
  onChangeText?: (text: string) => void;
  showOptions?: boolean,
}

const ChatHeader = ({
  showOptions,
  onChangeText,
}: appHeaderProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
  const { styles } = useFunctionalOrientation(responsiveStyles);
  const { theme } = useAppSelector(state => state.theme);
  const colors = useAppThemeColors();
  const dispatch = useAppDispatch();
  const { selectedMessages } = useAppSelector(state => state.ui);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const isDark = theme == "dark";

  //if any of selected message is un-starred 
  const un_starred = selectedMessages?.some(m => !m.starred);

  // if search bar
  if (showSearch)
    return (
      <SearchBarAnimated
        onBack={() => setShowSearch(false)}
        onChangeText={onChangeText}
      />
    );


  //if user selects messages
  if (showOptions)
    return (
      <View style={[[styles.container, !isDark && { backgroundColor: colors.primary1 }]]}>
        <View style={styles.row}>
          {/* button to deselect all messages */}
          <ButtonRipple
            onPress={() => dispatch(removeAllSelectedMsgs())}
            style={styles.btnStyle}>
            <IconAnt
              name="left"
              size={26}
              color={colors.secondary1}
            />
          </ButtonRipple>
          {/* total selected  messages */}
          <TextRegular style={styles.txtName}>
            {selectedMessages?.length}
          </TextRegular>
        </View>
        <View style={styles.row}>
          {/* forward */}
          <ButtonRipple
            onPress={() => ''}
            style={styles.btnStyle}>
            <IconEnt
              name='forward'
              size={24}
              color={colors.ternary1}
            />
          </ButtonRipple>
          {/* -----------star-------- */}
          <ButtonRipple
            onPress={() => {

              let updatedMsg: messageObjType[] = [];
              const ids = selectedMessages?.map(m => m.id)
              if (un_starred) {
                updatedMsg = selectedMessages?.map(m => ({ ...m, starred: true }));
              }
              else {
                updatedMsg = selectedMessages?.map(m => ({ ...m, starred: false }));
              }

              dispatch(updateMessages(updatedMsg));
              dispatch(removeAllSelectedMsgs())
            }}
            style={[styles.btnStyle, { marginLeft: 20 }]}>
            <IconMtc
              name={un_starred ? 'star' : 'star-off-outline'}
              size={24}
              color={colors.ternary1}
            />
          </ButtonRipple>
          {/* delete */}
          <ButtonRipple
            onPress={() => showMsgAlert({})}
            style={[styles.btnStyle, { marginLeft: 20 }]}>
            <IconMt
              name='delete'
              size={24}
              color={"tomato"}
            />
          </ButtonRipple>
        </View>
      </View>
    );


  //else render header
  return (
    <View style={[[styles.container, !isDark && { backgroundColor: colors.primary1 }]]}>
      <View style={styles.row}>
        {/* back button */}
        <ButtonRipple
          onPress={() => navigation.goBack()}
          style={styles.btnStyle}>
          <IconAnt
            name="left"
            size={26}
            color={colors.secondary1}
          />
        </ButtonRipple>
        {/* user details */}
        <UserAvatar
          size={40}
          name='G'
        />
        {/* conversation name */}
        <View style={{ marginLeft: 5 }}>
          <TextRegular style={styles.txtName}>
            My group
          </TextRegular>
          <TextRegular style={styles.txtSub}>
            3 online
          </TextRegular>
        </View>
      </View>
      <View style={styles.row}>
        {/* video */}
        <ButtonRipple
          onPress={() => ''}
          style={styles.btnStyle}>
          <IconMt
            name='videocam'
            size={24}
            color={colors.ternary1}
          />
        </ButtonRipple>
        {/* call */}
        <ButtonRipple
          onPress={() => ''}
          style={[styles.btnStyle, { marginLeft: 20 }]}>
          <IconMt
            name='call'
            size={24}
            color={colors.ternary1}
          />
        </ButtonRipple>
        {/* menu */}
        <ButtonRipple
          onPress={() => { setShowMenu(true) }}
          style={[styles.btnStyle, { marginLeft: 20 }]}>
          <IconEnt
            name='dots-three-vertical'
            size={20}
            color={colors.ternary1}
          />
        </ButtonRipple>
        {/*---------- menu ------- */}
        <ChatHeaderMenu
          showMenu={showMenu}
          onClose={() => setShowMenu(false)}
          onSearch={() => setShowSearch(true)}
        />
      </View>
    </View>
  );
};

export default ChatHeader;
