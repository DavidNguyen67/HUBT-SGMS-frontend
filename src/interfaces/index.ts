import { GENDER } from '@common';

export interface StudentFormValues {
  student_code: string;
  full_name: string;
  gender: GENDER;
  date_of_birth: Date;
  class_id: string;
}

export interface TeacherFormValues {
  teacher_code: string;
  full_name: string;
  gender: GENDER;
  date_of_birth: Date;
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
  class_code: string;
  class_name: string;
  studentIds: string[];
  teacherSubjectClassIds: string[];
}

export interface ClassFormValues {
  id?: string;
  class_code: string;
  class_name: string;
  created_at?: string;
  studentIds?: string[];
  teacherSubjectClassIds?: string[];
}

export interface StudentTableFilter {
  student_code?: string;
  full_name?: string;
  gender?: GENDER;
}

export interface TeacherTableFilter {
  teacher_code?: string;
  full_name?: string;
  gender?: GENDER;
}

export interface ClassTableFilter {
  class_code?: string;
  class_name?: string;
  teacher_name?: string;
  subject_name?: string;
}

export interface TeacherSubjectClassTableFilter {
  class_name?: string;
  class_code?: string;
  subject_name?: string;
  subject_code?: string;
  teacher_name?: string;
  teacher_code?: string;
}

export interface SubjectTableFilter {
  subject_code?: string;
  subject_name?: string;
  credits?: number;
  teacher_id?: string;
  class_id?: string;
}
