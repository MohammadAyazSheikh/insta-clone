import { faker } from '@faker-js/faker';
import { userType } from '../types/sharedTypes';

const gender = faker.person.sexType();

export function generateRandomUser(numberFfUsers: number): userType[] {

    const users: userType[] = [];

    for (let i = 0; i < numberFfUsers; i++) {
        const gender = faker.person.sexType();
        const firstName = faker.person.firstName(gender);
        const lastName = faker.person.lastName("male");

        const user = {
            id: faker.string.uuid(),
            firstName,
            lastName,
            gender,
            profileImage: faker.image.avatar(),
            dob: faker.date.birthdate(),
            userName: faker.internet.username({ firstName, lastName }),
            email: faker.internet.email({ firstName, lastName }),
            bio: faker.person.bio(),
        };
        users.push(user);
    }

    return users;
}

export const users = generateRandomUser(30);

