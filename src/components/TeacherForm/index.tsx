'use client';

import { Form, Input, Select, FormProps, DatePicker } from 'antd';
import * as yup from 'yup';
import { Teacher } from '@interfaces';
import { GENDER } from '@common';

interface TeacherFormProps {
  formProps: FormProps<Teacher>;
}

const teacherSchema = yup.object().shape({
  teacher_code: yup.string().required('Mã giáo viên là bắt buộc'),
  full_name: yup.string().required('Họ và tên là bắt buộc'),
  gender: yup
    .string()
    .oneOf([GENDER.MALE, GENDER.FEMALE, GENDER.OTHER])
    .required('Giới tính là bắt buộc'),
  date_of_birth: yup.date().required('Ngày sinh là bắt buộc'),
  subject: yup.string().required('Môn học là bắt buộc'),
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  phone_number: yup
    .string()
    .matches(/^[0-9]+$/, 'Số điện thoại chỉ chứa số')
    .required('Số điện thoại là bắt buộc'),
  address: yup.string().required('Địa chỉ là bắt buộc'),
});

const yupSync = {
  async validator({ field }: { field: any }, value: any) {
    await teacherSchema.validateSyncAt(field, { [field]: value });
  },
};

const TeacherForm = ({ formProps }: TeacherFormProps) => {
  const onFinish = async (values: Teacher) => {
    formProps.onFinish?.(values);
  };

  return (
    <Form layout="vertical" {...formProps} onFinish={onFinish}>
      <Form.Item name="teacher_code" label="Mã giáo viên" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item name="full_name" label="Họ và tên" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item name="gender" label="Giới tính" rules={[yupSync]}>
        <Select>
          <Select.Option value={GENDER.MALE}>Nam</Select.Option>
          <Select.Option value={GENDER.FEMALE}>Nữ</Select.Option>
          <Select.Option value={GENDER.OTHER}>Khác</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="date_of_birth" label="Ngày sinh" rules={[yupSync]}>
        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="subject" label="Môn học" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[yupSync]}>
        <Input type="email" />
      </Form.Item>

      <Form.Item name="phone_number" label="Số điện thoại" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item name="address" label="Địa chỉ" rules={[yupSync]}>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default TeacherForm;
