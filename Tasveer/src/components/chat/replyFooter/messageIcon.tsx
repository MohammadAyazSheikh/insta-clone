import React from 'react';
import IconAnt from '@expo/vector-icons/AntDesign';
import IconFe from '@expo/vector-icons/Feather';
import IconEn from '@expo/vector-icons/Entypo';
import { messageType } from '../../../constants/types/sharedTypes';

export const getMessageIcon = (name: messageType, color: string = "black") => {


    const messageIcons = {
        image: {
            icon: <IconFe
                name={'image'}
                size={20}
                color={color}
            />,
            text: 'Image'
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