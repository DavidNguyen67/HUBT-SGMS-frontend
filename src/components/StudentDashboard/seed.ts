export const grades = [
  { subject_name: 'Toán', grade: 8.5 },
  { subject_name: 'Lý', grade: 7.8 },
  { subject_name: 'Hóa', grade: 9.2 },
  { subject_name: 'Tin học', grade: 8.0 },
  { subject_name: 'Anh văn', grade: 6.5 },
];

export const gpa =
  grades.reduce((sum, item) => sum + item.grade, 0) / (grades.length || 1);
