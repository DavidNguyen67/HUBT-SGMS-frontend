'use client';

import { Form, Input, FormProps, Switch } from 'antd';
import * as yup from 'yup';
import { Rule } from 'antd/es/form';

export interface CategoryFormValues {
  name: string;
  isIncome: boolean;
}

interface CategoryFormProps {
  formProps: FormProps<CategoryFormValues>;
}

const categorySchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên Phân loại giao dịch'),
  isIncome: yup.boolean().required('Chọn trạng thái thu nhập'),
});

const yupSync: Rule = {
  async validator({ field }: { field: string }, value: any) {
    await categorySchema.validateSyncAt(field, { [field]: value });
  },
} as unknown as Rule;

const CategoryForm = ({ formProps }: CategoryFormProps) => {
  return (
    <Form layout="vertical" {...formProps}>
      <Form.Item label="Tên Phân loại giao dịch" name="name" rules={[yupSync]}>
        <Input placeholder="Nhập tên Phân loại giao dịch" />
      </Form.Item>
      <Form.Item
        label="Thu nhập"
        name="isIncome"
        valuePropName="checked"
        rules={[yupSync]}
      >
        <Switch checkedChildren="Thu nhập" unCheckedChildren="Chi tiêu" />
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
