'use client';

import { useSelect, useForm } from '@refinedev/antd';
import { Form, Input, InputNumber, Select, Button, Tooltip } from 'antd';
import * as yup from 'yup';
import { Rule } from 'antd/es/form';
import { SubjectFormValues } from '@interfaces';
import { MAX_TAGS_DISPLAY } from '@common';
import { Class, Teacher } from '@interfaces/response';
import { FormProps } from 'antd/lib';
import ClassTableSelect from '@components/ClassTableSelect';
import SelectedClassTable from '@components/SelectedClassTable';
import TeacherTableSelect from '@components/TeacherTableSelect';
import SelectedTeacherTable from '@components/SelectedTeacherTable';

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
  class_ids: yup.array().of(yup.string()),
  teacher_ids: yup.array().of(yup.string()),
});

const yupSync = {
  async validator({ field }: { field: string }, value: any) {
    await subjectSchema.validateSyncAt(field, { [field]: value });
  },
} as unknown as Rule;

const SubjectForm = ({ formProps }: StudentFormProps) => {
  const [form] = Form.useForm(formProps.form);

  const currentClassIds = Form.useWatch('class_ids', form) ?? [];

  const currentTeacherIds = Form.useWatch('teacher_ids', form) ?? [];

  const onFinish = async (values: SubjectFormValues) => {
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

      <Form.Item label="Lớp học" name="class_ids">
        <ClassTableSelect
          selectedRowKeys={formProps?.form?.getFieldValue('class_ids')}
          onChange={(keys) =>
            formProps?.form?.setFieldValue('class_ids', [
              ...currentClassIds,
              ...keys,
            ])
          }
          ignoreIds={currentClassIds}
        />
        {currentClassIds?.length > 0 && (
          <SelectedClassTable
            ids={formProps?.form?.getFieldValue('class_ids')?.join(',')}
            onRemoveId={(id) => {
              const newIds = currentClassIds.filter((item) => item !== id);
              formProps?.form?.setFieldValue('class_ids', newIds);
            }}
          />
        )}
      </Form.Item>

      <Form.Item label="Giáo viên" name="teacher_ids">
        <TeacherTableSelect
          selectedRowKeys={formProps?.form?.getFieldValue('teacher_ids')}
          onChange={(keys) =>
            formProps?.form?.setFieldValue('teacher_ids', [
              ...currentTeacherIds,
              ...keys,
            ])
          }
          ignoreIds={currentTeacherIds}
        />
        {currentTeacherIds?.length > 0 && (
          <SelectedTeacherTable
            ids={formProps?.form?.getFieldValue('teacher_ids')?.join(',')}
            onRemoveId={(id) => {
              const newIds = currentTeacherIds.filter((item) => item !== id);
              formProps?.form?.setFieldValue('teacher_ids', newIds);
            }}
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default SubjectForm;
