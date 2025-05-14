'use client';

import { StudentFormValues } from '@interfaces';
import { Form, Input, DatePicker, Select, FormProps } from 'antd';
import * as yup from 'yup';

const genderOptions = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Khác', value: 'other' },
];

const classOptions = [
  { label: '12A1', value: '12A1' },
  { label: '12A2', value: '12A2' },
  { label: '11B1', value: '11B1' },
  { label: '10C3', value: '10C3' },
];

interface StudentFormProps {
  formProps: FormProps<StudentFormValues>;
}

const StudentForm = (props: StudentFormProps) => {
  const studentSchema = yup.object().shape({
    student_code: yup.string().required('Mã sinh viên là bắt buộc'),
    full_name: yup.string().required('Họ tên là bắt buộc'),
    gender: yup
      .string()
      .oneOf(['male', 'female'])
      .required('Giới tính là bắt buộc'),
    date_of_birth: yup.date().required('Ngày sinh là bắt buộc'),
    class_name: yup.string().required('Lớp học là bắt buộc'),
  });

  const yupSync = {
    async validator({ field }: { field: any }, value: any) {
      await studentSchema.validateSyncAt(field, { [field]: value });
    },
  };

  const onFinish = async (values: StudentFormValues) => {
    console.log('Form values:', values);
    props.formProps.onFinish?.(values);
  };

  return (
    <Form layout="vertical" {...props.formProps} onFinish={onFinish}>
      <Form.Item label="Mã sinh viên" name="student_code" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item label="Họ tên" name="full_name" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item label="Giới tính" name="gender" rules={[yupSync]}>
        <Select options={genderOptions} />
      </Form.Item>

      <Form.Item label="Ngày sinh" name="date_of_birth" rules={[yupSync]}>
        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Lớp" name="class_name" rules={[yupSync]}>
        <Select options={classOptions} />
      </Form.Item>
    </Form>
  );
};

export default StudentForm;
