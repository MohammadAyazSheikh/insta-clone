import uuid from 'react-native-uuid';
import { userType } from '../types/sharedTypes';

export const users:userType[] = [
    {
        id:uuid.v4().toString(),
        firstName:'Ali',
        lastName:'Khan',
        userName:'ali_khan902',
        email:'ali@gmail.com',
        gender:'male',
        dob:new Date(),
    },
    {
        id:uuid.v4().toString(),
        firstName:'Fasih',
        lastName:'Ahmed',
        userName:'fasiahmed_1',
        email:'fasih@gmail.com',
        gender:'male',
        dob:new Date(),
    },
    {
        id:uuid.v4().toString(),
        firstName:'Sarah',
        lastName:'Farman',
        userName:'farman_sara1',
        email:'sara@gmail.com',
        gender:'female',
        dob:new Date(),
    },
    {
        id:uuid.v4().toString(),
        firstName:'Danish',
        lastName:'Khuram',
        userName:'khura89',
        email:'khuram@gmail.com',
        gender:'male',
        dob:new Date(),
    },
    {
        id:uuid.v4().toString(),
        firstName:'Haris',
        lastName:'Javed',
        userName:'_harisjaved911',
        email:'javedharis@gmail.com',
        gender:'male',
        dob:new Date(),
    },
    {
        id:uuid.v4().toString(),
        firstName:'Laiba',
        lastName:'Qureshi',
        userName:'qureshi00_sara',
        email:'sarah@gmail.com',
        gender:'female',
        dob:new Date(),
    }
]