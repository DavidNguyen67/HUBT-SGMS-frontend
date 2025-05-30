import { GENDER } from '@common';
import { Dayjs } from 'dayjs';

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
  date_of_birth_range?: [Dayjs, Dayjs];
  class_ids?: string[];
}

export interface TeacherTableFilter {
  teacher_code?: string;
  full_name?: string;
  gender?: GENDER;
  date_of_birth_range?: [Dayjs, Dayjs];
  teacher_subject_class?: string;
}

export interface ClassTableFilter {
  class_code?: string;
  class_name?: string;
  // teacher_name?: string;
  // subject_name?: string;
  teacher_ids?: string[];
  subject_ids?: string[];
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
  subject_code_and_name?: string;
  credits?: number;
  teacher_id?: string;
  class_id?: string;
}

export interface GradeTypeTableFilter {
  grade_name?: string;
  coefficient?: number;
  created_at_range?: [Dayjs, Dayjs];
  class_id?: string;
}

export interface GradeTypeFormValues {
  grade_name: string;
  coefficient: number;
}

export interface StudentGradeTableFilter {
  created_at_range?: [Dayjs, Dayjs];
  score?: number;
  subject_ids?: string;
  student_ids?: string;
}

export interface TeacherSubjectClassTableFilter {
  teacher_ids?: string;
  subject_ids?: string;
  class_ids?: string;
  create_at_range?: [Dayjs, Dayjs];
}

export interface TeacherSubjectClassFormValues {
  teacher_id: string;
  subject_id: string;
  class_id: string;
}
