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

  const currentStudentIds = Form.useWatch('studentIds', form) ?? [];

  const currentTeacherSubjectClassIds =
    Form.useWatch('teacherSubjectClassIds', form) ?? [];

  const onFinish = async (values: ClassFormValues) => {
    values.studentIds = Array.from(new Set(values.studentIds));

    values.teacherSubjectClassIds = Array.from(
      new Set(values.teacherSubjectClassIds)
    );

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

      <Form.Item name="studentIds" label="Sinh viên">
        <StudentTableSelect
          selectedRowKeys={formProps?.form?.getFieldValue('studentIds')}
          onChange={(keys) =>
            formProps?.form?.setFieldValue('studentIds', [
              ...currentStudentIds,
              ...keys,
            ])
          }
          ignoreIds={currentStudentIds}
        />
        {formProps?.form?.getFieldValue('studentIds')?.length > 0 && (
          <SelectedStudentTable
            ids={formProps?.form?.getFieldValue('studentIds')?.join(',')}
            onRemoveId={(id) => {
              const newIds = currentStudentIds.filter((item) => item !== id);
              formProps?.form?.setFieldValue('studentIds', newIds);
            }}
          />
        )}
      </Form.Item>

      <Form.Item name="teacherSubjectClassIds" label="Giáo viên và môn học">
        <TeacherSubjectClassTableSelect
          selectedRowKeys={formProps?.form?.getFieldValue(
            'teacherSubjectClassIds'
          )}
          onChange={(keys) =>
            formProps?.form?.setFieldValue('teacherSubjectClassIds', [
              ...currentTeacherSubjectClassIds,
              ...keys,
            ])
          }
          ignoreIds={currentTeacherSubjectClassIds}
        />
        {formProps?.form?.getFieldValue('teacherSubjectClassIds')?.length >
          0 && (
          <SelectedTeacherSubjectClassTable
            ids={formProps?.form?.getFieldValue('teacherSubjectClassIds')}
            onRemoveId={(id) => {
              const newIds = currentTeacherSubjectClassIds.filter(
                (item) => item !== id
              );
              formProps?.form?.setFieldValue('teacherSubjectClassIds', newIds);
            }}
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default ClassForm;
