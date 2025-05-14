'use client';

import TeacherForm from '@components/TeacherForm';
import { Teacher } from '@interfaces';
import { Create, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const TeacherCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    Teacher
  >({
    submitOnEnter: true,
    action: 'create',
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Row>
        <Col span={6} offset={8}>
          <TeacherForm formProps={formProps} />
        </Col>
      </Row>
    </Create>
  );
};

export default TeacherCreate;
