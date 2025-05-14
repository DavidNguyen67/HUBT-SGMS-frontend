import { v4 as uuidv4 } from 'uuid';

const fakeSubjects = [
  {
    id: uuidv4(),
    subject_code: 'MATH101',
    subject_name: 'Toán cao cấp',
    credits: 3,
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    subject_code: 'PHYS101',
    subject_name: 'Vật lý đại cương',
    credits: 4,
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    subject_code: 'CHEM101',
    subject_name: 'Hóa học cơ bản',
    credits: 3,
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    subject_code: 'LIT101',
    subject_name: 'Văn học Việt Nam',
    credits: 2,
    created_at: new Date(),
  },
  {
    id: uuidv4(),
    subject_code: 'ENG101',
    subject_name: 'Tiếng Anh 1',
    credits: 3,
    created_at: new Date(),
  },
];

export default fakeSubjects;
