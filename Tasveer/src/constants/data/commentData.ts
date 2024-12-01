import uuid from 'react-native-uuid';
import { commentType } from '../types/sharedTypes';
import { users } from './generateUsers';


export const comments: commentType[] = [
    {
        id: uuid.v4().toString(),
        comment: 'This photo is absolutely stunning! The colors are so vibrant and the composition is just perfect. You have a real talent for photography. 📸',
        createdAt: new Date(),
        likes: 12,
        user: users[1],
        replies: [
            {
                id: uuid.v4().toString(),
                comment: 'This is breathtaking! 😍',
                createdAt: new Date(),
                user: users[2],
                likes: 1,
            },
            {
                id: uuid.v4().toString(),
                comment: 'Keep up the amazing work! 💪',
                createdAt: new Date(),
                user: users[0],
                likes: 9,
            }
        ]
    },
    {
        id: uuid.v4().toString(),
        comment: '“This is nothing short of a masterpiece! The attention to detail, the use of color, the balance… it’s all just perfect. 🎨',
        createdAt: new Date(),
        user: users[5],
        likes: 1,
        replies: [

        ]
    },
    {
        id: uuid.v4().toString(),
        comment: 'Your posts always manage to make my day better. There’s something about your style that’s so uplifting and positive. Keep spreading the joy! ☀️',
        createdAt: new Date(),
        user: users[0],
        likes: 2,
        replies: [
            {
                id: uuid.v4().toString(),
                comment: 'This is too good to be true! 🌈',
                createdAt: new Date(),
                user: users[3],
            },
            {
                id: uuid.v4().toString(),
                comment: 'You’re incredibly talented! 🏆',
                createdAt: new Date(),
                user: users[4],
                likes: 4,
            },
            {
                id: uuid.v4().toString(),
                comment: 'This is beyond beautiful! 🌸',
                createdAt: new Date(),
                user: users[4],
            }
        ]
    },
    {
        id: uuid.v4().toString(),
        comment: 'This is so inspiring! Your creativity and originality shine through in every post. It’s always a pleasure to see your new work. 💡',
        createdAt: new Date(),
        user: users[5],
        likes: 89,
        replies: [

        ]
    },
    {
        id: uuid.v4().toString(),
        comment: 'I’m in love with your style! It’s unique, bold, and incredibly appealing. You definitely have an eye for design. 👌',
        createdAt: new Date(),
        user: users[4],
        likes: 2,
        replies: [
            {
                id: uuid.v4().toString(),
                comment: 'I’m in awe of your skills. 🙌',
                createdAt: new Date(),
                user: users[3],
                likes: 5
            },
            {
                id: uuid.v4().toString(),
                comment: 'This is simply amazing! 🎉',
                createdAt: new Date(),
                user: users[0],
                likes: 7,
            },
            {
                id: uuid.v4().toString(),
                comment: 'This is top-notch! 🎯',
                createdAt: new Date(),
                user: users[2],
            },
            {
                id: uuid.v4().toString(),
                comment: 'I can’t get enough of your posts! 📸',
                createdAt: new Date(),
                user: users[5],
            },
            {
                id: uuid.v4().toString(),
                comment: 'This is perfection! 👏',
                createdAt: new Date(),
                user: users[1],
                likes: 3
            }
        ]
    },
    {
        id: uuid.v4().toString(),
        comment: 'Your creativity is truly boundless. Every post you share introduces us to a new idea or perspective. Keep up the amazing work! 🚀',
        createdAt: new Date(),
        user: users[2],
        likes: 78,
        replies: [
            {
                id: uuid.v4().toString(),
                comment: 'You never fail to impress. 🌟',
                createdAt: new Date(),
                user: users[5],
                likes: 2
            },
            {
                id: uuid.v4().toString(),
                comment: 'You’re a true artist! 🖌️',
                createdAt: new Date(),
                user: users[0],
                likes: 12,
            },
            {
                id: uuid.v4().toString(),
                comment: 'This is out of this world! 🌍',
                createdAt: new Date(),
                user: users[1],
                likes: 5,
            },
            {
                id: uuid.v4().toString(),
                comment: 'I’m speechless! This is fantastic! 🤩',
                createdAt: new Date(),
                user: users[3],
            },

        ]
    }
]