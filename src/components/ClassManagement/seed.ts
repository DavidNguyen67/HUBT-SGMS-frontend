import { v4 as uuidv4 } from 'uuid';

export const classSeedData = [
  {
    id: uuidv4(),
    class_code: '12A1',
    class_name: 'Lớp 12A1',
    created_at: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    class_code: '11B2',
    class_name: 'Lớp 11B2',
    created_at: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    class_code: '10C3',
    class_name: 'Lớp 10C3',
    created_at: new Date().toISOString(),
  },
];
