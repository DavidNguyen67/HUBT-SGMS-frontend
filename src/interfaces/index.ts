import { GENDER } from '@common';

export interface StudentFormValues {
  student_code: string;
  full_name: string;
  gender: GENDER;
  date_of_birth: Date;
  class_name: string;
}
