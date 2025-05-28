'use client';

import { Form, Input, InputNumber, DatePicker, Select, FormProps } from 'antd';
import * as yup from 'yup';
import { Rule } from 'antd/es/form';
import UserPicker from '@elements/UserPicker';
import CategoryPicker from '@elements/CategoryPicker';
import WalletPicker from '@elements/CategoryPicker copy';

export interface TransactionFormValues {
  name: string;
  amount: number;
  description?: string;
  transactionDate: any;
  categoryId?: string;
  userId: string;
  walletId: string;
}

interface TransactionFormProps {
  formProps: FormProps<TransactionFormValues>;
}

const transactionSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên giao dịch'),
  amount: yup
    .number()
    .typeError('Số tiền phải là số')
    .required('Vui lòng nhập số tiền'),
  transactionDate: yup.date().required('Vui lòng chọn ngày giao dịch'),
  userId: yup.string().required('Vui lòng chọn người dùng'),
  walletId: yup.string().required('Vui lòng chọn ví'),
  // categoryId không required
});

const yupSync: Rule = {
  async validator({ field }: { field: string }, value: any) {
    await transactionSchema.validateSyncAt(field, { [field]: value });
  },
} as unknown as Rule;

const TransactionForm = ({ formProps }: TransactionFormProps) => {
  return (
    <Form layout="vertical" {...formProps}>
      <Form.Item label="Tên giao dịch" name="name" rules={[yupSync]}>
        <Input placeholder="Nhập tên giao dịch" />
      </Form.Item>
      <Form.Item label="Số tiền" name="amount" rules={[yupSync]}>
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          placeholder="Nhập số tiền"
        />
      </Form.Item>
      <Form.Item label="Mô tả" name="description">
        <Input.TextArea rows={2} placeholder="Nhập mô tả (nếu có)" />
      </Form.Item>
      <Form.Item
        label="Ngày giao dịch"
        name="transactionDate"
        rules={[yupSync]}
      >
        <DatePicker
          showTime
          style={{ width: '100%' }}
          placeholder="Chọn ngày giao dịch"
          format="YYYY-MM-DD HH:mm:ss"
        />
      </Form.Item>
      <Form.Item label="Danh mục" name="categoryId">
        <CategoryPicker />
      </Form.Item>
      <Form.Item label="Người dùng" name="userId" rules={[yupSync]}>
        <UserPicker />
      </Form.Item>
      <Form.Item label="Ví" name="walletId" rules={[yupSync]}>
        <WalletPicker />
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;
