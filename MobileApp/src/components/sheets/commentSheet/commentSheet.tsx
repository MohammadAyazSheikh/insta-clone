import React, { forwardRef, useState } from 'react';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import IconAnt from 'react-native-vector-icons/AntDesign';
import colors from '../../../theme/colors';
import SheetWrapper, { sheetWrapperProps } from '../sheetWrapper/sheetWrapper';
import { StyleSheet, TextInput, View } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { TextBold, TextRegular } from '../../general/text/text';
import Comment, { Replies } from './comment';
import { comments } from '../../../constants/data/commentData';
import UserAvatar from '../../general/avatar/avatar';
import { useAppSelector } from '../../../redux/hooks';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import ButtonRipple from '../../general/customButton/buttonRipple';


type sheetProps = {

} & Omit<sheetWrapperProps, 'children'>

const CommentSheet = forwardRef<BottomSheet, sheetProps>(({

  ...rest
}, ref) => {

  const { user } = useAppSelector(state => state.user);
  const { styles } = useFunctionalOrientation(responsiveStyles);
  const [text, setText] = useState<string>()

  return (
    <SheetWrapper {...rest} ref={ref}>
      <View style={styles.headerView}>
        <TextBold style={styles.txtHeader}>
          Comments
        </TextBold>
      </View>
      <BottomSheetFlatList
        data={comments}

        renderItem={({ item }) => (
          <Comment
            comment={item}
            totalReplies={item?.replies?.length}
            renderReplies={
              item?.replies?.length! > 0 ?
                <Replies
                  comments={item?.replies!}
                />
                :
                null
            }
          />
        )}
      />
      {/* ---footer----- */}
      <View style={styles.footerView}>
        {/* avatar */}
        <UserAvatar
          size={30}
          name={user?.userName}
        />
        {/* text input */}
        <TextInput
          placeholderTextColor={colors.grey1}
          placeholder='Add ac comment'
          style={styles.txtInput}
          onChangeText={(value) => {
            setText(value)
          }}
        />
        {/* send button */}
        {
          text &&
          <ButtonRipple onPress={() => ''}
          style = {{borderRadius:1000}}
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
    </SheetWrapper>
  );
});

export default CommentSheet;
