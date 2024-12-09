import React, { forwardRef, useCallback, useState } from 'react';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import IconAnt from '@expo/vector-icons/AntDesign';
import IconEnt from '@expo/vector-icons/Entypo';
import colors from '../../../theme/colors';
import SheetWrapper, { sheetWrapperProps } from '../sheetWrapper/sheetWrapper';
import { TextInput, View } from 'react-native';
import { TextBold, TextRegular } from '../../general/text/text';
import Comment, { Replies } from './comment';
import { comments } from '../../../constants/data/commentData';
import UserAvatar from '../../general/avatar/avatar';
import { useAppSelector } from '../../../redux/hooks';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { commentType } from '../../../constants/types/sharedTypes';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';


type sheetProps = {

} & Omit<sheetWrapperProps, 'children'>

const CommentSheet = forwardRef<BottomSheet, sheetProps>(({

  ...rest
}, ref) => {

  const { styles } = useStyles(styleSheet);
  const { user } = useAppSelector(state => state.user);
  const [text, setText] = useState<string>()
  const [replyTo, setReplyTo] = useState<commentType | null>();

  const renderComment = useCallback(({ item }: { item: commentType }) => (
    <Comment
      comment={item}
      totalReplies={item?.replies?.length}
      onReply={() => {
        setReplyTo(item);
      }}
      renderReplies={
        item?.replies?.length! > 0 ?
          <Replies
            comments={item?.replies!}
            onReply={(replyComment) => setReplyTo(replyComment)}
          />
          :
          null
      }
    />
  ), [setReplyTo])

  return (
    <SheetWrapper {...rest} ref={ref}>
      <View style={styles.headerView}>
        <TextBold style={styles.txtHeader}>
          Comments
        </TextBold>
      </View>
      {/* ----comment list---- */}
      <BottomSheetFlatList
        data={comments}
        renderItem={renderComment}
      />
      {/* ---footer----- */}
      <View style={styles?.footerView}>
        {/* reply user row */}
        {
          replyTo ?
            <Animated.View
              entering={FadeIn.duration(100)}
              exiting={FadeOut.duration(100)}
              style={[styles.replyRow]}
            >
              <TextRegular style={styles?.txtName}>
                {`Reply to ${replyTo.user.userName}`}
              </TextRegular>
              {/* cancel reply button */}
              <ButtonRipple onPress={() => setReplyTo(null)}
                style={{ borderRadius: 1000, padding: 3 }}
              >
                <IconEnt
                  name='cross'
                  size={22}
                  color={colors.secondary1}
                />
              </ButtonRipple>
            </Animated.View>
            :
            null
        }

        {/* input row */}
        <View style={styles.inputRow}>
          {/* avatar */}
          <UserAvatar
            size={30}
            name={user?.userName}
            image={user?.profileImage ? { uri: user.profileImage } : null}
          />
          {/* text input */}
          <TextInput
            placeholderTextColor={colors.grey1}
            placeholder='Add comment'
            style={styles.txtInput}
            onChangeText={(value) => {
              setText(value)
            }}
          />
          {/* send button */}
          {
            text &&
            <ButtonRipple onPress={() => ''}
              style={{ borderRadius: 1000 }}
            >
              <Animated.View
                entering={ZoomIn.duration(100)}
                exiting={ZoomOut.duration(100)}
                style={styles.btnSend}
              >
                <IconAnt
                  name='arrowup'
                  size={22}
                  color={'white'}
                />
              </Animated.View>
            </ButtonRipple>
          }
        </View>
      </View>
    </SheetWrapper>
  );
});

export default CommentSheet;
