import { faker } from '@faker-js/faker';
import { users } from './generateUsers';


export const inboxData = users.map(user => (
  {
    sender: user,
    id: faker.string.uuid(),
    message: faker.lorem.sentences(1),
    timestamp: faker.date.recent(),
    badge: faker.number.int({ min: 0, max: 3 })
  }
))
