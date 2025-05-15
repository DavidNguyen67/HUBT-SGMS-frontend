import { GENDER } from '@common';

export interface StudentFormValues {
  student_code: string;
  full_name: string;
  gender: GENDER;
  date_of_birth: Date;
  class_id: string;
}

export interface SubjectFormValues {
  subject_code: string;
  subject_name: string;
  credits: number;
}

export interface GradeFormValues {
  id?: string;
  grade_name: string;
  coefficient: number;
  created_at?: string;
}

export interface StudentGradeFormValues {
  id?: string;
  student_id: string;
  subject_id: string;
  score: number;
  created_at?: string;
  student_name?: string;
  subject_name?: string;
}

export interface ClassFormValues {
  id?: string;
  class_code: string;
  class_name: string;
  created_at?: string;
}

export interface Teacher {
  id: string;
  full_name: string;
  gender: GENDER;
  date_of_birth: Date;
  subject: string;
  email: string;
  phone_number: string;
  address: string;
  created_at: Date;
}
