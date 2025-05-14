'use client';

import StudentGradeForm from '@components/StudentGradeForm';
import { StudentGradeFormValues } from '@interfaces';
import { Create, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const StudentGradeCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    StudentGradeFormValues
  >({
    action: 'create',
    submitOnEnter: true,
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Row>
        <Col span={6} offset={8}>
          <StudentGradeForm formProps={formProps} />
        </Col>
      </Row>
    </Create>
  );
};

export default StudentGradeCreate;
