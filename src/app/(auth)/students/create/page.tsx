'use client';

import { GENDER } from '@common';
import StudentForm from '@components/StudentForm';
import { StudentFormValues } from '@interfaces';
import { Create, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const StudentCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    StudentFormValues
  >({
    defaultFormValues: {
      gender: GENDER.FEMALE,
    },
    submitOnEnter: true,
    action: 'create',
    resource: 'api/v1/students',
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Row>
        <Col span={6} offset={8}>
          <StudentForm formProps={formProps} />
        </Col>
      </Row>
    </Create>
  );
};

export default StudentCreate;
