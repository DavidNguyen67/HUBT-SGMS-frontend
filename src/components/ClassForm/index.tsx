'use client';

import { Form, Input, FormProps } from 'antd';
import * as yup from 'yup';
import { ClassFormValues } from '@interfaces';
import { Rule } from 'antd/es/form';

interface ClassFormProps {
  formProps: FormProps<ClassFormValues>;
}

const classSchema = yup.object().shape({
  class_code: yup.string().required('Mã lớp là bắt buộc'),
  class_name: yup.string().required('Tên lớp là bắt buộc'),
});

const yupSync = {
  async validator({ field }: { field: any }, value: any) {
    await classSchema.validateSyncAt(field, { [field]: value });
  },
} as unknown as Rule;

const ClassForm = ({ formProps }: ClassFormProps) => {
  const onFinish = async (values: ClassFormValues) => {
    formProps.onFinish?.(values);
  };

  return (
    <Form layout="vertical" {...formProps} onFinish={onFinish}>
      <Form.Item name="class_code" label="Mã lớp" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item name="class_name" label="Tên lớp" rules={[yupSync]}>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default ClassForm;
