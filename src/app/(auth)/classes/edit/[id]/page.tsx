'use client';

import ClassForm from '@components/ClassForm';
import { ClassFormValues } from '@interfaces';
import { Edit, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const ClassEdit = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    ClassFormValues
  >({
    submitOnEnter: true,
    action: 'edit',
    id: 'class_id',
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Row>
        <Col span={6} offset={8}>
          <ClassForm formProps={formProps} />
        </Col>
      </Row>
    </Edit>
  );
};

export default ClassEdit;
