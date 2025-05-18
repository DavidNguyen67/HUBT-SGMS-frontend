'use client';

import { Form, InputNumber, FormProps } from 'antd';
import { StudentGradeFormValues } from '@interfaces';
import SubjectPicker from '@elements/SubjectPicker';
import StudentPicker from '@elements/StudentPicker';
import GradeTypePicker from '@elements/GradeTypePicker';
import * as yup from 'yup';
import { Rule } from 'antd/es/form';

interface StudentGradeFormProps {
  formProps: FormProps<StudentGradeFormValues>;
}

const studentGradeSchema = yup.object().shape({
  student_id: yup.string().required('Chọn sinh viên'),
  subject_id: yup.string().required('Chọn môn học'),
  grade_type_id: yup.string().required('Chọn loại điểm'),
  score: yup
    .number()
    .typeError('Điểm phải là số')
    .required('Nhập điểm')
    .min(0, 'Điểm tối thiểu là 0')
    .max(10, 'Điểm tối đa là 10'),
});

export const yupSync = {
  async validator({ field }: { field: any }, value: any) {
    await studentGradeSchema.validateSyncAt(field, { [field]: value });
  },
} as unknown as Rule;

const StudentGradeForm = ({ formProps }: StudentGradeFormProps) => {
  return (
    <Form layout="vertical" {...formProps}>
      <Form.Item label="Sinh viên" name="student_id" rules={[yupSync]}>
        <StudentPicker
          mode={undefined}
          initialId={formProps.initialValues?.student_id}
        />
      </Form.Item>

      <Form.Item label="Môn học" name="subject_id" rules={[yupSync]}>
        <SubjectPicker
          mode={undefined}
          initialId={formProps.initialValues?.subject_id}
        />
      </Form.Item>

      <Form.Item label="Loại điểm" name="grade_type_id" rules={[yupSync]}>
        <GradeTypePicker
          mode={undefined}
          initialId={formProps.initialValues?.grade_type_id}
        />
      </Form.Item>

      <Form.Item label="Điểm" name="score" rules={[yupSync]}>
        <InputNumber
          min={0}
          max={10}
          step={0.25}
          style={{ width: '100%' }}
          placeholder="Nhập điểm môn học"
        />
      </Form.Item>
    </Form>
  );
};

export default StudentGradeForm;
