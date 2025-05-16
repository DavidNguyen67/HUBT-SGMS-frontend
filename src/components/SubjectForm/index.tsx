'use client';

import { Form, Input, InputNumber } from 'antd';
import * as yup from 'yup';
import { Rule } from 'antd/es/form';
import { SubjectFormValues } from '@interfaces';
import { FormProps } from 'antd/lib';

interface StudentFormProps {
  formProps: FormProps<SubjectFormValues>;
}

const subjectSchema = yup.object().shape({
  subject_code: yup.string().required('Mã môn học là bắt buộc'),
  subject_name: yup.string().required('Tên môn học là bắt buộc'),
  credits: yup
    .number()
    .typeError('Số tín chỉ phải là số')
    .required('Số tín chỉ là bắt buộc')
    .min(1, 'Ít nhất 1 tín chỉ')
    .max(10, 'Tối đa 10 tín chỉ'),
});

const yupSync = {
  async validator({ field }: { field: string }, value: any) {
    await subjectSchema.validateSyncAt(field, { [field]: value });
  },
} as unknown as Rule;

const SubjectForm = ({ formProps }: StudentFormProps) => {
  const [form] = Form.useForm(formProps.form);

  const onFinish = async (values: SubjectFormValues) => {
    console.log('Check values:', JSON.stringify(values, null, 2));
    formProps.onFinish?.(values);
  };

  return (
    <Form layout="vertical" {...formProps} form={form} onFinish={onFinish}>
      <Form.Item label="Mã môn học" name="subject_code" rules={[yupSync]}>
        <Input placeholder="Nhập mã môn học..." />
      </Form.Item>

      <Form.Item label="Tên môn học" name="subject_name" rules={[yupSync]}>
        <Input placeholder="Nhập tên môn học..." />
      </Form.Item>

      <Form.Item label="Số tín chỉ" name="credits" rules={[yupSync]}>
        <InputNumber
          min={1}
          max={10}
          style={{ width: '100%' }}
          placeholder="Nhập số tín chỉ"
        />
      </Form.Item>
    </Form>
  );
};

export default SubjectForm;
