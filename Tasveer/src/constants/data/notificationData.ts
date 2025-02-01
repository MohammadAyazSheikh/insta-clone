import { faker } from '@faker-js/faker/.';
import { users } from './generateUsers';
import { notificationObjectType, notificationTypes, userType } from '../types/sharedTypes';


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

const subTitle = {
    FollowRequest: "want's to follow you",
    FriendSuggestion: ", who you might know, is on Tasveer",
    AcceptRequest: ", has accepted your request",
    Like: "liked your photo",
    Comment: "liked your comment"
}

export const generateNotifications = (length: number) => {

    const notifications: notificationObjectType[] = [];

    const notificationType_: notificationTypes[] = ["FollowRequest", "FriendSuggestion", "AcceptRequest", "Like", "Comment"];


    for (let i = 0; i < length; i++) {

        //generate random notification type
        const type = faker.helpers.arrayElement(notificationType_);

        //getting random user index
        const userIndex1 = faker.number.int({ min: 0, max: users.length - 1 });

        let users_: userType[] = [users[userIndex1]];

        //if comment and likes add another user
        if (type === "Comment" || type === "Like") {
            const userIndex2 = faker.number.int({ min: 0, max: users.length - 1 });
            users_.push(users[userIndex2])
        }

        notifications.push({
            id: faker.string.uuid(),
            type,
            title: users_.map(u => (u.userName)).join(", "),
            subTitle: subTitle[type],
            time: faker.date.recent(),
            users: users_
        })

    }
    return notifications;
}

export const notificationsData = generateNotifications(20);

