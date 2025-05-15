'use client';

import { StudentFormValues } from '@interfaces';
import { Form, Input, DatePicker, Select, FormProps } from 'antd';
import * as yup from 'yup';
import { useSelect } from '@refinedev/antd';
import { Class } from '@interfaces/response';
import { GENDER } from '@common';
import dayjs from 'dayjs';

const genderOptions = [
  { label: 'Nam', value: GENDER.MALE },
  { label: 'Nữ', value: GENDER.FEMALE },
  { label: 'Khác', value: GENDER.OTHER },
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
      .oneOf([GENDER.FEMALE, GENDER.MALE, GENDER.OTHER])
      .required('Giới tính là bắt buộc'),
    date_of_birth: yup.date().required('Ngày sinh là bắt buộc'),
    class_id: yup.string().required('Lớp học là bắt buộc'),
  });

  const { selectProps } = useSelect<Class>({
    resource: 'api/v1/classes', // Endpoint API để lấy danh sách lớp học
    optionLabel: 'class_name', // Trường hiển thị trong dropdown
    optionValue: 'id', // Trường giá trị (UUID của lớp học)
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
      <Form.Item
        label="Ngày sinh"
        name="date_of_birth"
        rules={[yupSync]}
        getValueProps={(value) => ({
          value: value ? dayjs(value) : undefined,
        })}
      >
        <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Lớp" name="class_id" rules={[yupSync]}>
        <Select {...selectProps} />
      </Form.Item>
    </Form>
  );
};

export default StudentForm;
