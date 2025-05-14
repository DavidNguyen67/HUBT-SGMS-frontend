'use client';

import TeacherForm from '@components/TeacherForm';
import { Teacher } from '@interfaces';
import { Edit, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const TeacherUpdate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    Teacher
  >({
    submitOnEnter: true,
    action: 'edit',
    id: 'teacher_id',
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Row>
        <Col span={6} offset={8}>
          <TeacherForm formProps={formProps} />
        </Col>
      </Row>
    </Edit>
  );
};

export default TeacherUpdate;
