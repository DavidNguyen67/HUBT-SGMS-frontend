'use client';

import StudentForm from '@components/StudentForm';
import { StudentFormValues } from '@interfaces';
import { Edit, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const StudentUpdate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    StudentFormValues
  >({
    submitOnEnter: true,
    action: 'edit',
    id: 'student_id',
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Row>
        <Col span={6} offset={8}>
          <StudentForm formProps={formProps} />
        </Col>
      </Row>
    </Edit>
  );
};

export default StudentUpdate;
