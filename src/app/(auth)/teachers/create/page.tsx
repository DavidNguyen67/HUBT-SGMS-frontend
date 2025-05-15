'use client';

import { GENDER } from '@common';
import TeacherForm from '@components/TeacherForm';
import { TeacherFormValues } from '@interfaces';
import { Create, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const TeacherCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    TeacherFormValues
  >({
    defaultFormValues: {
      gender: GENDER.FEMALE,
    },
    submitOnEnter: true,
    action: 'create',
    resource: 'api/v1/teachers',
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Thêm giáo viên"
      breadcrumb={null}
    >
      <Row>
        <Col span={6} offset={8}>
          <TeacherForm formProps={formProps} />
        </Col>
      </Row>
    </Create>
  );
};

export default TeacherCreate;
