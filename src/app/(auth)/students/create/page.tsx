'use client';

import { GENDER } from '@common';
import StudentForm from '@components/StudentForm';
import { StudentFormValues } from '@interfaces';
import { Create, SaveButton, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const StudentCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    StudentFormValues
  >({
    submitOnEnter: true,
    action: 'create',
    resource: 'api/v1/students',
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Thêm sinh viên"
      breadcrumb={null}
      footerButtons={({ saveButtonProps }) => (
        <>
          <SaveButton {...saveButtonProps}>Tạo</SaveButton>
        </>
      )}
    >
      <Row>
        <Col span={6} offset={8}>
          <StudentForm formProps={formProps} />
        </Col>
      </Row>
    </Create>
  );
};

export default StudentCreate;
