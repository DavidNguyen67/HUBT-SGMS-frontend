'use client';

import { Form } from 'antd';
import * as yup from 'yup';
import { Rule } from 'antd/es/form';
import { TeacherSubjectClassFormValues } from '@interfaces';
import { FormProps } from 'antd/lib';
import TeacherPicker from '@elements/TeacherPicker';
import SubjectPicker from '@elements/SubjectPicker';
import ClassPicker from '@elements/ClassPicker';

interface TeacherSubjectClassFormProps {
  formProps: FormProps<TeacherSubjectClassFormValues>;
}

const teacherSubjectClassSchema = yup.object().shape({
  teacher_id: yup.string().required('Chọn giáo viên'),
  subject_id: yup.string().required('Chọn môn học'),
  class_id: yup.string().required('Chọn lớp học'),
});

const yupSync = {
  async validator({ field }: { field: string }, value: any) {
    await teacherSubjectClassSchema.validateSyncAt(field, { [field]: value });
  },
} as unknown as Rule;

const TeacherSubjectClassForm = ({
  formProps,
}: TeacherSubjectClassFormProps) => {
  const onFinish = async (values: TeacherSubjectClassFormValues) => {
    formProps.onFinish?.(values);
  };

  return (
    <Form layout="vertical" {...formProps} onFinish={onFinish}>
      <Form.Item label="Giáo viên" name="teacher_id" rules={[yupSync]}>
        <TeacherPicker
          mode={undefined}
          initialId={formProps.initialValues?.teacher_id}
        />
      </Form.Item>
      <Form.Item label="Môn học" name="subject_id" rules={[yupSync]}>
        <SubjectPicker
          mode={undefined}
          initialId={formProps.initialValues?.subject_id}
        />
      </Form.Item>
      <Form.Item label="Lớp học" name="class_id" rules={[yupSync]}>
        <ClassPicker
          mode={undefined}
          initialId={formProps.initialValues?.class_id}
        />
      </Form.Item>
    </Form>
  );
};

export default TeacherSubjectClassForm;
