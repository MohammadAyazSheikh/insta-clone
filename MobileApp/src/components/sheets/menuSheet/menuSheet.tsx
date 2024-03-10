import React, { forwardRef } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Menu from './menu';
import IconFe from 'react-native-vector-icons/Feather';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../theme/colors';
import SheetWrapper, { sheetWrapperProps } from '../sheetWrapper/sheetWrapper';



type sheetProps = {
  onStar?: () => void,
  onFollow?: () => void,
  onHide?: () => void,
  onReport?: () => void,
} & Omit<sheetWrapperProps, 'children'>

const OptionSheet = forwardRef<BottomSheet, sheetProps>(({
  onStar,
  onFollow,
  onHide,
  onReport,
  ...rest
}, ref) => {

  return (
    <SheetWrapper {...rest} ref={ref}>
      <BottomSheetScrollView>
        {/* Add to favorite */}
        <Menu
          title={'Add to favorite'}
          containerStyle={{
            borderTopColor: colors.grey1,
            borderTopWidth: 0.5
          }}
          icon={
            <IconFe
              name={'star'}
              color={colors.primary1}
              size={24}
            />
          }
          onPress={() => {
            onStar && onStar();

          }}
        />
        {/* Un-follow */}
        <Menu
          title={'Unfollow'}
          containerStyle={{
            borderBottomColor: colors.grey1,
            borderBottomWidth: 0.5
          }}
          icon={
            <IconFe
              name={'user-minus'}
              color={colors.primary1}
              size={24}
            />
          }
          onPress={() => {
            onFollow && onFollow();
          }}
        />
        {/* Hide */}
        <Menu
          title={'Hide'}
          icon={
            <IconMtc
              name={'eye-off-outline'}
              color={colors.primary1}
              size={24}
            />
          }
          onPress={() => {
            onHide && onHide();
          }}
        />
        {/* Report */}
        <Menu
          title={'Report'}
          titleStyle={{ color: 'tomato' }}
          icon={
            <IconMtc
              name={'comment-alert-outline'}
              color={'tomato'}
              size={24}
            />
          }
          onPress={() => {
            onReport && onReport();

          }}
        />
      </BottomSheetScrollView>
    </SheetWrapper>
  );
});

export default OptionSheet;
