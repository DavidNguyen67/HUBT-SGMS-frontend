'use client';

import { GradeFormValues } from '@interfaces';
import { Form, Input, InputNumber, FormProps, Button } from 'antd';
import { Rule } from 'antd/es/form';
import * as yup from 'yup';

interface GradeFormProps {
  formProps: FormProps<GradeFormValues>;
}
const gradeSchema = yup.object().shape({
  grade_name: yup.string().required('Tên loại điểm là bắt buộc'),
  coefficient: yup
    .number()
    .required('Số tín chỉ là bắt buộc')
    .min(1, 'Số tín chỉ ít nhất là 1')
    .max(10, 'Số tín chỉ tối đa là 10'),
});

const yupSync = {
  async validator({ field }: { field: any }, value: any) {
    await gradeSchema.validateSyncAt(field, { [field]: value });
  },
} as unknown as Rule;

const GradeForm = ({ formProps }: GradeFormProps) => {
  const onFinish = async (values: GradeFormValues) => {
    formProps.onFinish?.(values);
  };

  return (
    <Form layout="vertical" {...formProps} onFinish={onFinish}>
      <Form.Item label="Tên loại điểm" name="grade_name" rules={[yupSync]}>
        <Input placeholder="Nhập tên loại điểm" />
      </Form.Item>

      <Form.Item label="Số tín chỉ" name="coefficient" rules={[yupSync]}>
        <InputNumber
          min={1}
          max={10}
          style={{ width: '100%' }}
          placeholder="Nhập số tín chỉ (1-10)"
        />
      </Form.Item>
    </Form>
  );
};

export default GradeForm;
