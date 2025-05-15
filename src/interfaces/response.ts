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
}

export interface Class {
  id: string;
  class_code: string;
  class_name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}
