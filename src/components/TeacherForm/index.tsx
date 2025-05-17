'use client';

import { Form, Input, Select, FormProps, DatePicker } from 'antd';
import * as yup from 'yup';
import { TeacherFormValues } from '@interfaces';
import { DEFAULT_DATE_FORMAT, GENDER } from '@common';
import { Rule } from 'antd/es/form';
import dayjs from 'dayjs';

interface TeacherFormProps {
  formProps: FormProps<TeacherFormValues>;
}

const teacherSchema = yup.object().shape({
  teacher_code: yup.string().required('Mã giáo viên là bắt buộc'),
  full_name: yup.string().required('Họ và tên là bắt buộc'),
  gender: yup
    .string()
    .oneOf([GENDER.MALE, GENDER.FEMALE, GENDER.OTHER])
    .required('Giới tính là bắt buộc'),
  date_of_birth: yup.date().required('Ngày sinh là bắt buộc'),
});

const yupSync = {
  async validator({ field }: { field: any }, value: any) {
    await teacherSchema.validateSyncAt(field, { [field]: value });
  },
} as unknown as Rule;

const TeacherForm = ({ formProps }: TeacherFormProps) => {
  const onFinish = async (values: TeacherFormValues) => {
    formProps.onFinish?.(values);
  };

  return (
    <Form layout="vertical" {...formProps} onFinish={onFinish}>
      <Form.Item name="teacher_code" label="Mã giáo viên" rules={[yupSync]}>
        <Input placeholder="Nhập mã giáo viên" allowClear />
      </Form.Item>

      <Form.Item name="full_name" label="Họ và tên" rules={[yupSync]}>
        <Input placeholder="Nhập họ và tên giáo viên" allowClear />
      </Form.Item>

      <Form.Item name="gender" label="Giới tính" rules={[yupSync]}>
        <Select placeholder="Chọn giới tính" allowClear>
          <Select.Option value={GENDER.MALE}>Nam</Select.Option>
          <Select.Option value={GENDER.FEMALE}>Nữ</Select.Option>
          <Select.Option value={GENDER.OTHER}>Khác</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="date_of_birth"
        label="Ngày sinh"
        rules={[yupSync]}
        getValueProps={(value) => ({
          value: value ? dayjs(value) : undefined,
        })}
      >
        <DatePicker
          allowClear
          format={DEFAULT_DATE_FORMAT}
          style={{ width: '100%' }}
          placeholder="Chọn ngày sinh"
        />
      </Form.Item>
    </Form>
  );
};

export default TeacherForm;
