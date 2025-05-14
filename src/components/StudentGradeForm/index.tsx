'use client';

import { Form, InputNumber, Select, FormProps } from 'antd';
import { StudentGradeFormValues } from '@interfaces';

const studentOptions = [
  { label: 'Nguyễn Văn A', value: '1' },
  { label: 'Trần Thị B', value: '2' },
];

const subjectOptions = [
  { label: 'Toán', value: 'math' },
  { label: 'Văn', value: 'literature' },
];

interface Props {
  formProps: FormProps<StudentGradeFormValues>;
}

const StudentGradeForm = ({ formProps }: Props) => {
  return (
    <Form layout="vertical" {...formProps}>
      <Form.Item
        label="Sinh viên"
        name="student_id"
        rules={[{ required: true, message: 'Chọn sinh viên' }]}
      >
        <Select options={studentOptions} />
      </Form.Item>

      <Form.Item
        label="Môn học"
        name="subject_id"
        rules={[{ required: true, message: 'Chọn môn học' }]}
      >
        <Select options={subjectOptions} />
      </Form.Item>

      <Form.Item
        label="Điểm"
        name="score"
        rules={[{ required: true, message: 'Nhập điểm' }]}
      >
        <InputNumber min={0} max={10} step={0.25} style={{ width: '100%' }} />
      </Form.Item>
    </Form>
  );
};

export default StudentGradeForm;
