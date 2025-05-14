import { v4 as uuid } from 'uuid';

export const fakeGrades = [
  {
    id: uuid(),
    grade_name: 'Điểm miệng',
    coefficient: 1,
    created_at: new Date(),
  },
  {
    id: uuid(),
    grade_name: '15 phút',
    coefficient: 1,
    created_at: new Date(),
  },
  {
    id: uuid(),
    grade_name: '1 tiết',
    coefficient: 2,
    created_at: new Date(),
  },
  {
    id: uuid(),
    grade_name: 'Học kỳ',
    coefficient: 3,
    created_at: new Date(),
  },
];
