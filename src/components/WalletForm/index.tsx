'use client';

import { Form, Input, InputNumber, FormProps, Button } from 'antd';
import * as yup from 'yup';
import { Rule } from 'antd/es/form';
import UserPicker from '@elements/UserPicker';

export interface WalletFormValues {
  name: string;
  balance: number;
  userId: string;
}

interface WalletFormProps {
  formProps: FormProps<WalletFormValues>;
}

const walletSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên ví'),
  balance: yup
    .number()
    .typeError('Số dư phải là số')
    .required('Vui lòng nhập số dư'),
  userId: yup.string().required('Vui lòng chọn người dùng'),
});

const yupSync: Rule = {
  async validator({ field }: { field: string }, value: any) {
    await walletSchema.validateSyncAt(field, { [field]: value });
  },
} as unknown as Rule;

const WalletForm = ({ formProps }: WalletFormProps) => {
  return (
    <Form layout="vertical" {...formProps}>
      <Form.Item label="Tên ví" name="name" rules={[yupSync]}>
        <Input placeholder="Nhập tên ví" />
      </Form.Item>
      <Form.Item label="Số dư" name="balance" rules={[yupSync]}>
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          placeholder="Nhập số dư"
        />
      </Form.Item>
      <Form.Item label="Người dùng" name="userId" rules={[yupSync]}>
        <UserPicker />
      </Form.Item>
    </Form>
  );
};

export default WalletForm;
