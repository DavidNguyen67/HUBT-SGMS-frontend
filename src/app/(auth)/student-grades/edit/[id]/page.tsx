'use client';

import StudentGradeForm from '@components/StudentGradeForm';
import { StudentGradeFormValues } from '@interfaces';
import { Edit, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const StudentGradeEdit = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    StudentGradeFormValues
  >({
    action: 'edit',
    submitOnEnter: true,
    id: 'student_grade_id',
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Row>
        <Col span={6} offset={8}>
          <StudentGradeForm formProps={formProps} />
        </Col>
      </Row>
    </Edit>
  );
};

export default StudentGradeEdit;
