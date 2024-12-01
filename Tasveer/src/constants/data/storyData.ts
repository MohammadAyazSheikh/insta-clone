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


    const categories = ['nature', 'sports', 'food', 'travel', 'animals', 'fashion', 'technology', "city"];
    const category = faker.helpers.arrayElement(categories);

    const stories: storyDataType[] = [];

    for (let i = 0; i < n; i++) {
        const content = Array.from({ length: faker.number.int({ min: 1, max: 5 }) })
            .map(item => ({
                id: faker.string.uuid(),
                uri: faker.image.urlLoremFlickr({ category, width, height })
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


