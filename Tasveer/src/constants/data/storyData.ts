import { faker } from '@faker-js/faker/.';
import { userType } from '../types/sharedTypes';
import { users } from './generateUsers';
import { heightToDp, widthToDp } from '../../utils/functions/responsiveUtils';

const width = widthToDp(100);
const height = heightToDp(100);

export type storyDataType = {
    id: string,
    user: userType,
    timeStamp: Date,
    totalUnseen: number
    content: { uri: any, id: string }[]
}


const generateStories = (n: number) => {

    const stories: storyDataType[] = [];

    for (let i = 0; i < n; i++) {
        const content = Array.from({ length: faker.number.int({ min: 1, max: 5 }) })
            .map(item => ({
                id: faker.string.uuid(),
                uri: faker.image.urlPicsumPhotos({ width, height, blur: 0 })
            }));
        stories.push({
            id: faker.string.uuid(),
            user: users[i],
            timeStamp: faker.date.recent(),
            totalUnseen: content.length,
            content
        })
        stories
    }

    return stories

}

export const stories = generateStories(5);


