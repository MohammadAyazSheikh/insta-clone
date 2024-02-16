import uuid from 'react-native-uuid';

export type storyDataType = {
    image: any,
    userId: string,
    userName: string,
    timeStamp: string,
    content: { image: any }[]
}
export const storyData: storyDataType[] = [
    {
        userId: uuid.v4().toString(),
        image: require('../../../assets/images/cities/karachi1.jpg'),
        userName: 'Karachi',
        timeStamp: '1h',
        content: [
            {
                image: require('../../../assets/images/cities/karachi1.jpg')
            },
            {
                image: require('../../../assets/images/cities/karachi2.jpg')
            },
            {
                image: require('../../../assets/images/cities/karachi3.jpg')
            },
            {
                image: require('../../../assets/images/cities/karachi4.jpg')
            },
            {
                image: require('../../../assets/images/cities/karachi5.jpg')
            },
        ]
    },
    {
        userId: uuid.v4().toString(),
        image: require('../../../assets/images/cities/lahore1.jpg'),
        userName: 'Lahore',
        timeStamp: '2h',
        content: [
            {
                image: require('../../../assets/images/cities/lahore1.jpg')
            },
            {
                image: require('../../../assets/images/cities/lahore2.jpg')
            },
            {
                image: require('../../../assets/images/cities/lahore3.jpg')
            },
            {
                image: require('../../../assets/images/cities/lahore4.jpg')
            },
            {
                image: require('../../../assets/images/cities/lahore5.jpg')
            },
        ]
    },
    {
        userId: uuid.v4().toString(),
        image: require('../../../assets/images/cities/islamabad1.jpg'),
        userName: 'Islamabad',
        timeStamp: '4h',
        content: [
            {
                image: require('../../../assets/images/cities/islamabad1.jpg')
            },
            {
                image: require('../../../assets/images/cities/islamabad2.jpg')
            },
            {
                image: require('../../../assets/images/cities/islamabad3.jpg')
            },
            {
                image: require('../../../assets/images/cities/islamabad4.jpg')
            },
            {
                image: require('../../../assets/images/cities/islamabad5.jpg')
            },
            {
                image: require('../../../assets/images/cities/islamabad6.jpg')
            },
            {
                image: require('../../../assets/images/cities/islamabad7.jpg')
            },
        ]
    },
    {
        userId: uuid.v4().toString(),
        image: require('../../../assets/images/cities/skardu1.jpg'),
        userName: 'Skardu',
        timeStamp: '9h',
        content: [
            {
                image: require('../../../assets/images/cities/skardu1.jpg')
            },
            {
                image: require('../../../assets/images/cities/skardu2.jpg')
            },
            {
                image: require('../../../assets/images/cities/skardu3.jpg')
            },
            {
                image: require('../../../assets/images/cities/skardu4.jpg')
            },
            {
                image: require('../../../assets/images/cities/skardu5.jpg')
            },
        ]
    },
]