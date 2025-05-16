'use client';

import { Form, Input, FormProps } from 'antd';
import * as yup from 'yup';
import { ClassFormValues } from '@interfaces';
import { Rule } from 'antd/es/form';
import StudentTableSelect from '@components/StudentTableSelect';
import SelectedStudentTable from '@components/SelectedStudentTable';
import TeacherSubjectClassTableSelect from '@components/TeacherSubjectClassTableSelect';
import SelectedTeacherSubjectClassTable from '@components/SelectedTeacherSubjectClassTable';

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
  const [form] = Form.useForm(formProps.form);

  const initialStudentIds = Form.useWatch('studentIds', form) ?? [];

  const onFinish = async (values: ClassFormValues) => {
    formProps.onFinish?.(values);
  };

  return (
    <Form layout="vertical" {...formProps} form={form} onFinish={onFinish}>
      <Form.Item name="class_code" label="Mã lớp" rules={[yupSync]}>
        <Input width={200} placeholder="Nhập mã lớp" />
      </Form.Item>

      <Form.Item name="class_name" label="Tên lớp" rules={[yupSync]}>
        <Input width={200} placeholder="Nhập tên lớp" />
      </Form.Item>

      <Form.Item name="studentIds" label={`Số lượng Sinh viên: ${1}`}>
        <StudentTableSelect
          selectedRowKeys={formProps?.form?.getFieldValue('studentIds')}
          onChange={(keys) =>
            formProps?.form?.setFieldValue('studentIds', [
              ...initialStudentIds,
              ...keys,
            ])
          }
          ignoreIds={initialStudentIds}
        />
        {formProps?.form?.getFieldValue('studentIds')?.length > 0 && (
          <SelectedStudentTable
            ids={formProps?.form?.getFieldValue('studentIds')?.join(',')}
          />
        )}
      </Form.Item>

      <Form.Item
        name="teacherSubjectClassIds"
        label={`Số lượng Giáo viên - Môn học: ${1}`}
      >
        <TeacherSubjectClassTableSelect
          selectedRowKeys={formProps?.form?.getFieldValue(
            'teacherSubjectClassIds'
          )}
          onChange={(keys) =>
            formProps?.form?.setFieldValue('teacherSubjectClassIds', keys)
          }
        />
        {formProps?.form?.getFieldValue('teacherSubjectClassIds')?.length >
          0 && (
          <SelectedTeacherSubjectClassTable
            ids={formProps?.form?.getFieldValue('teacherSubjectClassIds')}
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default ClassForm;
