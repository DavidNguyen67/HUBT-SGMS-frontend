import { GENDER } from '@common';

export interface ResponsePagination<T> {
  data: T[];
  total: number;
}

export interface Student {
  id: string;
  full_name: string;
  student_code: string;
  date_of_birth: string;
  gender: GENDER;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  class: Class;
}

export interface Teacher {
  id: string;
  full_name: string;
  teacher_code: string;
  date_of_birth: string;
  gender: GENDER;
  teacherSubjectClasses: TeacherSubjectClass[];
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface TeacherSubjectClass {
  id: string;
  created_at: string;
  updated_at: string;
  class: Class;
  teacher: Teacher;
  subject: Subject;
  deleted_at?: string;
}

export interface Subject {
  id: string;
  subject_code: string;
  subject_name: string;
  credits: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Class {
  id: string;
  class_code: string;
  class_name: string;
  studentCount: number;
  teacherSubjectClasses: TeacherSubjectClass[];
  students: Student[];
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}
