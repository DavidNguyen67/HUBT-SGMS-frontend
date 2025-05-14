import { Teacher } from '@interfaces';
import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { GENDER } from '@common';

const generateTeachers = (num: number) => {
  const teachers: Teacher[] = [];

  for (let i = 0; i < num; i++) {
    teachers.push({
      id: uuid(),
      full_name: faker.name.fullName(),
      gender: faker.helpers.arrayElement([
        GENDER.FEMALE,
        GENDER.MALE,
        GENDER.OTHER,
      ]),
      date_of_birth: faker.date.past({ years: 50 }),
      subject: faker.helpers.arrayElement([
        'Math',
        'Literature',
        'Physics',
        'Chemistry',
        'History',
      ]),
      email: faker.internet.email(),
      phone_number: faker.phone.number(),
      address: faker.address.streetAddress(),
      created_at: faker.date.past({ years: 1 }),
    });
  }

  return teachers;
};

// Giả sử bạn muốn seed 10 giáo viên
export const fakeTeachers = generateTeachers(10);
