import { v4 as uuid } from 'uuid';

const fakeStudentGrades = [
  {
    id: uuid(),
    student_id: '1',
    student_name: 'Nguyễn Văn A',
    subject_id: 'math',
    subject_name: 'Toán',
    score: 8.5,
    created_at: new Date().toISOString(),
  },
  {
    id: uuid(),
    student_id: '2',
    student_name: 'Trần Thị B',
    subject_id: 'literature',
    subject_name: 'Văn',
    score: 9.0,
    created_at: new Date().toISOString(),
  },
  {
    id: uuid(),
    student_id: '3',
    student_name: 'Lê Văn C',
    subject_id: 'english',
    subject_name: 'Tiếng Anh',
    score: 7.5,
    created_at: new Date().toISOString(),
  },
  {
    id: uuid(),
    student_id: '4',
    student_name: 'Phạm Thị D',
    subject_id: 'history',
    subject_name: 'Lịch Sử',
    score: 8.0,
    created_at: new Date().toISOString(),
  },
  {
    id: uuid(),
    student_id: '5',
    student_name: 'Nguyễn Văn E',
    subject_id: 'geography',
    subject_name: 'Địa Lý',
    score: 9.5,
    created_at: new Date().toISOString(),
  },
];

export default fakeStudentGrades;
