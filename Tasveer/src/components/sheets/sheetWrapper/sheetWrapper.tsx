import React, { useCallback, forwardRef } from 'react';
import {
  ViewStyle,
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';



export type sheetWrapperProps = {
  sheetBgStyle?: ViewStyle,
  snapPoints?: string[],
  children?: React.ReactNode
}

const SheetWrapper = forwardRef<BottomSheet, sheetWrapperProps>(({
  children,
  sheetBgStyle,
  snapPoints = ['40%', '70%', '100%']
},
  ref) => {

  const { styles } = useStyles(styleSheet);

  // callbacks
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );
  return (
    <BottomSheet
      ref={ref}
      // onChange={handleSheetChanges}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={[styles.bgSheet, sheetBgStyle]}
      handleIndicatorStyle={styles.handleIndStyle}
      enablePanDownToClose
      index={-1}
    >
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          {
            children
          }
        </SafeAreaView>
      </SafeAreaProvider>
    </BottomSheet>
  );
});

export default SheetWrapper;
