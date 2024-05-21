import React, { useCallback, forwardRef } from 'react';
import {
  ViewStyle,
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
// import { useAppThemeColors } from '../../../utils/functions/responsiveUtils';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


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

  const { styles } = useFunctionalOrientation(responsiveStyles);
  // const colors = useAppThemeColors();


  // callbacks
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        // disappearsOnIndex={snapPoints.length}
        appearsOnIndex={1}
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
