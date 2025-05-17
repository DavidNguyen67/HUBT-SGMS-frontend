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

export const PAGE_SIZE_OPTIONS = ['5', '10', '20'];

export const MAX_TAGS_DISPLAY = 1;

export const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';
