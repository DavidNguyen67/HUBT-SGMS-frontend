'use client';

import { StudentFormValues } from '@interfaces';
import { Form, Input, DatePicker, Select, FormProps } from 'antd';
import * as yup from 'yup';
import { useSelect } from '@refinedev/antd';
import { Class } from '@interfaces/response';
import { DEFAULT_DATE_FORMAT, GENDER } from '@common';
import dayjs from 'dayjs';
import { Rule } from 'antd/es/form';
import viVN from 'antd/es/date-picker/locale/vi_VN';
import ClassPicker from '@elements/ClassPicker';

const genderOptions = [
  { label: 'Nam', value: GENDER.MALE },
  { label: 'Nữ', value: GENDER.FEMALE },
  { label: 'Khác', value: GENDER.OTHER },
];

const studentSchema = yup.object().shape({
  student_code: yup.string().required('Mã sinh viên là bắt buộc'),
  full_name: yup.string().required('Họ tên là bắt buộc'),
  gender: yup
    .string()
    .oneOf([GENDER.FEMALE, GENDER.MALE, GENDER.OTHER])
    .required('Giới tính là bắt buộc'),
  date_of_birth: yup.date().required('Ngày sinh là bắt buộc'),
  class_id: yup.string().required('Lớp học là bắt buộc'),
});

const yupSync = {
  async validator({ field }: { field: any }, value: any) {
    await studentSchema.validateSyncAt(field, { [field]: value });
  },
} as unknown as Rule;

interface StudentFormProps {
  formProps: FormProps<StudentFormValues>;
}

const StudentForm = (props: StudentFormProps) => {
  const onFinish = async (values: StudentFormValues) => {
    props.formProps.onFinish?.(values);
  };

  return (
    <Form layout="vertical" {...props.formProps} onFinish={onFinish}>
      <Form.Item label="Mã sinh viên" name="student_code" rules={[yupSync]}>
        <Input placeholder="Nhập mã sinh viên" allowClear />
      </Form.Item>

      <Form.Item label="Họ tên" name="full_name" rules={[yupSync]}>
        <Input placeholder="Nhập họ tên sinh viên" allowClear />
      </Form.Item>

      <Form.Item label="Giới tính" name="gender" rules={[yupSync]}>
        <Select
          options={genderOptions}
          placeholder="Chọn giới tính"
          allowClear
        />
      </Form.Item>
      <Form.Item
        label="Ngày sinh"
        name="date_of_birth"
        rules={[yupSync]}
        getValueProps={(value) => ({
          value: value ? dayjs(value) : undefined,
        })}
      >
        <DatePicker
          format={DEFAULT_DATE_FORMAT}
          style={{ width: '100%' }}
          placeholder="Chọn ngày sinh"
          allowClear
        />
      </Form.Item>

      <Form.Item label="Lớp" name="class_id" rules={[yupSync]}>
        <ClassPicker />
      </Form.Item>
    </Form>
  );
};

export default StudentForm;
