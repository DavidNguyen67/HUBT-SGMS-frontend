'use client';

import { Form, Input, InputNumber, FormProps } from 'antd';
import * as yup from 'yup';
import { SubjectFormValues } from '@interfaces';
import { Rule } from 'antd/es/form';

interface SubjectFormProps {
  formProps: FormProps<SubjectFormValues>;
}

const SubjectForm = (props: SubjectFormProps) => {
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
    async validator({ field }: { field: any }, value: any) {
      await subjectSchema.validateSyncAt(field, { [field]: value });
    },
  } as unknown as Rule;

  const onFinish = async (values: SubjectFormValues) => {
    console.log('Form values:', values);
    props.formProps.onFinish?.(values);
  };

  return (
    <Form layout="vertical" {...props.formProps} onFinish={onFinish}>
      <Form.Item label="Mã môn học" name="subject_code" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item label="Tên môn học" name="subject_name" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item label="Số tín chỉ" name="credits" rules={[yupSync]}>
        <InputNumber min={1} max={10} style={{ width: '100%' }} />
      </Form.Item>
    </Form>
  );
};

export default SubjectForm;
