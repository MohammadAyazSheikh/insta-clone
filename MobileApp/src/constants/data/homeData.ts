import uuid from 'react-native-uuid';

export type homeDataType = {
    uri: any,
    userId: string,
    userName: string,
    timeStamp: string,
    totalUnseen: number,
    content: { id: string, uri: any, type: "image" | 'video' }[]
}
export const homeData: homeDataType[] = [
    {
        userId: uuid.v4().toString(),
        uri: require('../../../assets/images/cities/karachi1.jpg'),
        userName: 'Karachi',
        timeStamp: '1h',
        totalUnseen: 5,
        content: [
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/karachi1.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'video',
                uri: {uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' 
}
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/karachi3.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/karachi4.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/karachi5.jpg')
            },
        ]
    },
    {
        userId: uuid.v4().toString(),
        uri: require('../../../assets/images/cities/lahore1.jpg'),
        userName: 'Lahore',
        timeStamp: '2h',
        totalUnseen: 5,
        content: [
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/lahore1.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/lahore2.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/lahore3.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/lahore4.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/lahore5.jpg')
            },
        ]
    },
    {
        userId: uuid.v4().toString(),
        uri: require('../../../assets/images/cities/islamabad1.jpg'),
        userName: 'Islamabad',
        timeStamp: '4h',
        totalUnseen: 7,
        content: [
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/islamabad1.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/islamabad2.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/islamabad3.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'video',
                uri: {uri:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' 
}
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/islamabad4.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/islamabad5.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/islamabad6.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/islamabad7.jpg')
            },
        ]
    },
    {
        userId: uuid.v4().toString(),
        uri: require('../../../assets/images/cities/skardu1.jpg'),
        userName: 'Skardu',
        timeStamp: '9h',
        totalUnseen: 5,
        content: [
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/skardu1.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/skardu2.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/skardu3.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/skardu4.jpg')
            },
            {
                id: uuid.v4().toString(),
                type: 'image',
                uri: require('../../../assets/images/cities/skardu5.jpg')
            },
        ]
    },
]