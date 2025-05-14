import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

type Student = {
  id: string;
  full_name: string;
  student_code: string;
  date_of_birth: string;
  gender: 'male' | 'female';
  class_name: string;
  created_at: string;
};

// Tạo danh sách lớp ngẫu nhiên
const classes = ['10A1', '10A2', '11B1', '11B2', '12C1', '12C2'];

export const generateFakeStudents = (count: number): Student[] => {
  return Array.from({ length: count }).map(() => {
    const gender = faker.helpers.arrayElement(['male', 'female']) as
      | 'male'
      | 'female';
    const fullName = faker.person.fullName({
      sex: gender === 'male' ? 'male' : 'female',
    });

    return {
      id: uuidv4(),
      full_name: fullName,
      student_code: faker.string.alphanumeric({ length: 8, casing: 'upper' }),
      date_of_birth: faker.date
        .birthdate({ min: 15, max: 18, mode: 'age' })
        .toISOString()
        .split('T')[0],
      gender,
      class_name: faker.helpers.arrayElement(classes),
      created_at: faker.date.recent({ days: 90 }).toISOString(),
    };
  });
};

// Ví dụ: tạo 10 học viên
const fakeStudents = generateFakeStudents(10);

export default fakeStudents;
