import { messageObjType, userType } from '../types/sharedTypes';
import uuid from 'react-native-uuid';
export const getConversationData = (user: userType): messageObjType[] => {

    return (
        [
            {
                id: uuid.v4().toString(),
                type: 'location',
                createdAt: new Date(),
                status: 'sent',
                user: {
                    id: 98032,
                    firstName: "Harry",
                },
                location: {
                    latitude: 24.8607,
                    longitude: 67.0011,
                    address: "Karachi, Pakistan"
                },
                reacts: []
            },
            {
                id: uuid.v4().toString(),
                text: 'reply please?',
                type: 'text',
                createdAt: new Date(),
                status: 'sent',
                user: {
                    id: user?.id,
                    firstName: user?.firstName,
                },
                reacts: []
            },
            {
                id: uuid.v4().toString(),
                text: 'are you there?',
                type: 'text',
                createdAt: new Date(),
                status: 'delivered',
                starred: true,
                user: {
                    id: user?.id,
                    firstName: user?.firstName,
                },
                reacts: []
            },
            {
                id: uuid.v4().toString(),
                text: 'this is the vid i was talking about 😀',
                type: 'video',
                video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                createdAt: new Date(),
                status: 'seen',
                starred: true,
                user: {
                    id: 2,
                    firstName: 'John',
                },
                reacts: []
            },
            {
                id: uuid.v4().toString(),
                text: ' hey did you watch john which?',
                type: 'text',
                createdAt: new Date(),
                user: {
                    id: user?.id,
                    firstName: user?.firstName,
                },
                status: 'seen',
                reacts: []
            },
            {
                id: uuid.v4().toString(),
                text: '',
                type: 'voice',
                createdAt: new Date(),
                status: 'seen',
                user: {
                    id: 2,
                    firstName: 'John',
                },
                reacts: []
            },
            {
                id: uuid.v4().toString(),
                text: 'hey mail this to the HR by this sunday!',
                type: 'document',
                document: 'insights.xls',
                createdAt: new Date(),
                status: 'seen',
                user: {
                    id: 2,
                    firstName: 'John',
                },
                reacts: []
            },
            {
                id: uuid.v4().toString(),
                text: 'All set bro',
                type: 'text',
                createdAt: new Date(),
                status: 'seen',
                user: {
                    id: 1,
                    firstName: 'Ahmed',
                },
                reacts: []
            },
        ]
    )
}