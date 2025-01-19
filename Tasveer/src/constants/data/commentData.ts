import uuid from 'react-native-uuid';
import { commentType } from '../types/sharedTypes';
import { users } from './generateUsers';
import { faker } from '@faker-js/faker/.';
import { max, min } from 'moment';


const generateComments = () => {

    const comments: commentType[] = [];

    for (let index = 0; index < 6; index++) {

        const id = faker.string.uuid();
        const createdAt = faker.date.recent();

        //replies 
        const replies: commentType[] = [];

        for (let i = 0; i < faker.number.int({ min: 0, max: 4 }); i++) {
            replies.push(
                {
                    id: faker.string.uuid(),
                    comment: faker.lorem.paragraphs({ min: 1, max: 3 }),
                    createdAt: faker.date.between({ from: createdAt, to: new Date() }),
                    likes: faker.number.int({ min: 0, max: 100 }),
                    user: faker.helpers.arrayElement(users),
                    repliedId: id
                }
            )
        }

        //parent comment
        comments.push({
            id,
            comment: faker.lorem.paragraphs({ min: 1, max: 4 }),
            createdAt,
            likes: faker.number.int({ min: 0, max: 100 }),
            user: faker.helpers.arrayElement(users),
            replies: replies
        })
    }

    return comments;
}

export const comments = generateComments();
