// import { faker } from '@faker-js/faker'

// export const users = Array.from({ length: 20 }, () => {
//   const firstName = faker.person.firstName()
//   const lastName = faker.person.lastName()
//   return {
//     id: faker.string.uuid(),
//     microsoftEntraId: faker.string.uuid(),
//     username: faker.internet
//       .username({ firstName, lastName })
//       .toLocaleLowerCase(),
//     fullName: (firstName + lastName),
//     email: faker.internet.email({ firstName }).toLocaleLowerCase(),
//     group: faker.helpers.arrayElement([
//       'group1',
//       'group2',
//       'group3',
//       'group4',
//     ]),
//     organization: faker.helpers.arrayElement([
//       'organization1',
//       'organization2',
//       'organization3',
//       'organization4',
//     ]),
//     department: faker.helpers.arrayElement([
//       'department1',
//       'department2',
//       'department3',
//       'department4',
//     ]),
//     status: faker.helpers.arrayElement([
//       'active',
//       'inactive',
//     ]),
//     role: faker.helpers.arrayElement([
//       'viewer',
//       'executor',
//       'reviewer',
//       'admin',
//     ]),
//     createdAt: faker.date.past(),
//     updatedAt: faker.date.recent(),
//   }
// })

import axios from 'axios';

export const users = async () => {
  const response = await axios.get('/users');

  return response.data.data
}
