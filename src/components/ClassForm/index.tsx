'use client';

import { Form, Input, FormProps, Select } from 'antd';
import * as yup from 'yup';
import { ClassFormValues } from '@interfaces';
import { Rule } from 'antd/es/form';
import { Student, TeacherSubjectClass } from '@interfaces/response';
import { useSelect } from '@refinedev/antd';

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
  const { selectProps: studentSelectProps } = useSelect<Student>({
    resource: 'api/v1/students',
    optionLabel: 'full_name',
    optionValue: 'id',
    onSearch: (value) => [
      {
        field: 'value',
        operator: 'contains',
        value,
      },
    ],
    meta: {
      externalFilters: {
        _end: 50,
      },
    },
  });

  const { selectProps: teacherSubjectClassSelectProps } =
    useSelect<TeacherSubjectClass>({
      resource: 'api/v1/teacher-subject-classes',
      optionLabel: (item) =>
        item.teacher.full_name + ' - ' + item.subject.subject_name,
      optionValue: 'id',
      onSearch: (value) => [
        {
          field: 'value',
          operator: 'contains',
          value,
        },
      ],
      meta: {
        externalFilters: {
          end: 50,
        },
      },
    });

  const onFinish = async (values: ClassFormValues) => {
    formProps.onFinish?.(values);
  };

  return (
    <Form layout="vertical" {...formProps} onFinish={onFinish}>
      <Form.Item name="class_code" label="Mã lớp" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item name="class_name" label="Tên lớp" rules={[yupSync]}>
        <Input />
      </Form.Item>

      <Form.Item name="studentIds" label="Sinh viên">
        <Select
          {...studentSelectProps}
          placeholder="Chọn sinh viên"
          allowClear
          mode="multiple"
          filterOption={false}
        />
      </Form.Item>

      <Form.Item name="teacherSubjectClassIds" label="Giáo viên - Môn học">
        <Select
          {...teacherSubjectClassSelectProps}
          placeholder="Chọn cặp giáo viên - môn học"
          mode="multiple"
          allowClear
          filterOption={false}
        />
      </Form.Item>
    </Form>
  );
};

export default ClassForm;
