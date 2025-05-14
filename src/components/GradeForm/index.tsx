'use client';

import { GradeFormValues } from '@interfaces';
import { Form, Input, InputNumber, FormProps } from 'antd';
import * as yup from 'yup';

interface GradeFormProps {
  formProps: FormProps<GradeFormValues>;
}

const GradeForm = ({ formProps }: GradeFormProps) => {
  const gradeSchema = yup.object().shape({
    grade_name: yup.string().required('Tên loại điểm là bắt buộc'),
    coefficient: yup
      .number()
      .required('Hệ số là bắt buộc')
      .min(1, 'Hệ số ít nhất là 1')
      .max(10, 'Hệ số tối đa là 10'),
  });

  const yupSync = {
    async validator({ field }: { field: any }, value: any) {
      await gradeSchema.validateSyncAt(field, { [field]: value });
    },
  };

  const onFinish = async (values: GradeFormValues) => {
    formProps.onFinish?.(values);
  };

  return (
    <Form layout="vertical" {...formProps} onFinish={onFinish}>
      <Form.Item label="Tên loại điểm" name="grade_name" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item label="Hệ số" name="coefficient" rules={[yupSync]}>
        <InputNumber min={1} max={10} style={{ width: '100%' }} />
      </Form.Item>
    </Form>
  );
};

export default GradeForm;
