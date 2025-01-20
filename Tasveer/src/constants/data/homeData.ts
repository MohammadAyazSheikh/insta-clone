import { faker } from '@faker-js/faker/.';
import { users } from './generateUsers';
import { userType } from '../types/sharedTypes';
import { remoteVideos } from './remoteVideo';

export type homeDataType = {
    uri: any,
    userId: string,
    userName: string,
    timeStamp: string,
    content: { id: string, uri: any, type: "image" | 'video' }[]
}

export type postType = {
    id: string,
    user: userType,
    timestamp: Date,
    caption?: string,
    media: { id: string, uri: string, type: "image" | 'video' }[]
}


export const generatePosts = (numberOfPosts: number) => {

    const posts: postType[] = [];

    const categories = ['nature', 'sports', 'food', 'travel', 'animals', 'fashion', 'technology', "city"];


    for (let i = 0; i < numberOfPosts; i++) {
        const category = faker.helpers.arrayElement(categories);
        posts.push({
            id: faker.string.uuid(),
            user: faker.helpers.arrayElement(users),
            timestamp: faker.date.recent(),
            caption: faker.lorem.lines({ min: 0, max: 10 }),
            media: Array.from({ length: faker.number.int({ min: 1, max: 5 }) })
                .map(() => {
                    const type = faker.helpers.arrayElement(["image", "image", "image", 'video']);
                    const uri = type == "video" ?
                        remoteVideos[faker.number.int({ min: 0, max: remoteVideos.length - 1 })].uri
                        :
                        faker.image.urlLoremFlickr({ category, width: 400, height: 400 })
                    return ({
                        id: faker.string.uuid(),
                        uri,
                        type
                    })
                }),
        })
    }
    return posts;
}

export const posts = generatePosts(10);

