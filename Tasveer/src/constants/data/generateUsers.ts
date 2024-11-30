import { faker } from '@faker-js/faker';
import { userType } from '../types/sharedTypes';

const gender = faker.person.sexType();

export function generateRandomUser(numberFfUsers: number): userType[] {

    const users: userType[] = [];
    
    for (let i = 0; i < numberFfUsers; i++) {
        const user = {
            id: faker.string.uuid(),
            profileImage: faker.image.avatar(),
            dob: faker.date.birthdate(),
            userName: faker.internet.username(),
            email: faker.internet.email(),
            firstName: faker.person.firstName(gender),
            lastName: faker.person.lastName("male"),
            gender: faker.person.sexType(),
            bio: faker.person.bio(),
        };
        users.push(user);
    }

    return users;
}

