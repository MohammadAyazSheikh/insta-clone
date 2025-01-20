import React, { useCallback, forwardRef } from 'react';
import {
  ViewStyle
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';
import styleSheet from './styles/styles';
import { useAppSelector } from '../../../redux/hooks';



export type sheetWrapperProps = {
  sheetBgStyle?: ViewStyle,
  snapPoints?: string[],
  children?: React.ReactNode
}

const SheetWrapper = forwardRef<BottomSheet, sheetWrapperProps>(({
  children,
  sheetBgStyle,
  snapPoints = ['90%']
},
  ref) => {

  const { styles } = useStyles(styleSheet);
  const theme = useAppSelector(state => state.theme);

  const isDark = theme.theme === "dark";

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
        opacity={0.7}
      />
    ),
    []
  );

  // const renderBackground = useCallback(() =>
  //   <BlurView
  //     experimentalBlurMethod="dimezisBlurView"
  //     intensity={100}
  //     style={{ ...StyleSheet.absoluteFillObject }}
  //     tint={isDark ? "dark" :"light"}
  //   />
  //   , [isDark]);

  return (
    <BottomSheet
      ref={ref}
      // onChange={handleSheetChanges}
      snapPoints={snapPoints}
      // backgroundComponent={renderBackground}
      backdropComponent={renderBackdrop}
      backgroundStyle={[styles.bgSheet, sheetBgStyle]}
      handleIndicatorStyle={styles.handleIndStyle}
      enablePanDownToClose
      enableDynamicSizing = {false}
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
