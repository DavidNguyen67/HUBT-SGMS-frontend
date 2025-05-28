import 'dotenv/config';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

export const appConfig = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
};

console.log('Check appConfig:', appConfig);

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum ROLE {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export const TAG_GENDER_MAPPING: Record<GENDER, string> = {
  [GENDER.FEMALE]: 'Nữ',
  [GENDER.MALE]: 'Nam',
  [GENDER.OTHER]: 'Khác',
};

export const TAG_GENDER_COLOR_MAPPING: Record<GENDER, string> = {
  [GENDER.FEMALE]: 'pink',
  [GENDER.MALE]: 'blue',
  [GENDER.OTHER]: 'green',
};

export enum STUDENT_PERFORMANCE {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  AVERAGE = 'average',
  POOR = 'poor',
}

export const PAGE_SIZE_OPTIONS = ['5', '10', '20'];

export const MAX_TAGS_DISPLAY = 1;

export const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';

export const userId = '19aa8383-051a-41bf-ab0b-eeca26eb4da7';
