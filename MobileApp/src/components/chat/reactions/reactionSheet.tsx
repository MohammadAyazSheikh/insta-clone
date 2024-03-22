import React, { forwardRef } from 'react';
import BottomSheet, { BottomSheetFlatList} from '@gorhom/bottom-sheet';
import SheetWrapper, { sheetWrapperProps } from '../../sheets/sheetWrapper/sheetWrapper';
import UserReaction from './userReaction';
import { useAppSelector } from '../../../redux/hooks';



type sheetProps = {

} & Omit<sheetWrapperProps, 'children'>

const ReactionSheet = forwardRef<BottomSheet, sheetProps>(({

  ...rest
}, ref) => {

  const { selectedReaction } = useAppSelector(state => state.ui);
  return (
    <SheetWrapper {...rest} ref={ref}>
        <BottomSheetFlatList
          data={selectedReaction}
          keyExtractor={item => item.user.id?.toString()!}
          renderItem={({ item }) => (
            <UserReaction
              {...item}
            />
          )}
        />
    </SheetWrapper>
  );
});

export default ReactionSheet;
