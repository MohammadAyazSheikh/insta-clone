import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { showConfirmAlert } from '../components/general/alerts/confirmAlert';


export const useBackHandler = (onBack: () => boolean) => (
    useEffect(() => {
    
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBack,
        );

        return () => backHandler.remove();
    }, []));


export const useAppExit = (onBack?: () => void, stopGoBack = true) => (
    useEffect(() => {
        const backAction = () => {

            onBack && onBack();
            
            showConfirmAlert({
                title: "We'll miss you 😥",
                description: 'Are your sure want to exit?',
                confirmText: 'Fuck you!',
                onConfirm: () => {
                    BackHandler.exitApp()
                }
            });
            return stopGoBack;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []));