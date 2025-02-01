import { userType } from '../types/sharedTypes';
import { remoteVideos } from './remoteVideo';
import { faker } from '@faker-js/faker/.';
import { users } from './generateUsers';

export type discoverDataType = {
    id: string,
    user?: userType,
    uri: any,
    timeStamp: Date,
    type: 'image' | 'reel' | 'video',
}

export const generateDiscoverdPosts = (numberOfPosts: number) => {

    const posts: discoverDataType[] = [];

    for (let i = 0; i < numberOfPosts; i++) {
        const type = faker.helpers.arrayElement(['image', 'reel', 'video']);
        const uri = type === "image" ?
            faker.image.url({  width: 400, height: 400 })
            :
            remoteVideos[faker.number.int({ min: 0, max: remoteVideos.length - 1 })].uri
        posts.push({
            id: faker.string.uuid(),
            user: faker.helpers.arrayElement(users),
            type,
            timeStamp: faker.date.recent(),
            uri,
        })
    }
    return posts;
}

export const discoverData = generateDiscoverdPosts(20);
