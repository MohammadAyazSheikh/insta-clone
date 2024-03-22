import React from 'react';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFe from 'react-native-vector-icons/Feather';
import IconEn from 'react-native-vector-icons/Entypo';
import { messageType } from '../../../constants/types/sharedTypes';

export const getMessageIcon = (name: messageType, color: string = "black") => {


    const messageIcons = {
        image: {
            icon: <IconFe
                name={'image'}
                size={20}
                color={color}
            />,
            text: 'Voice'
        },
        video: {
            icon: <IconEn
                name={'video'}
                size={20}
                color={color}
            />,
            text: 'Video'
        },
        document: {
            icon: <IconFe
                name='file'
                color={color}
                size={20}
            />,
            text: 'Document'
        },
        voice: {
            icon: <IconAnt
                name='sound'
                color={color}
                size={20}
            />,
            text: 'Voice'
        },
        location: {
            icon: <IconEn
                name='location'
                color={color}
                size={20}
            />,
            text: 'Location'
        }
    }

    return messageIcons[name || 'document'];
}