'use client';

import GradeForm from '@components/GradeForm';
import { GradeFormValues } from '@interfaces';
import { Edit, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const GradeCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    GradeFormValues
  >({
    submitOnEnter: true,
    action: 'create',
    id: 'grade_id',
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Row>
        <Col span={6} offset={8}>
          <GradeForm formProps={formProps} />
        </Col>
      </Row>
    </Edit>
  );
};

export default GradeCreate;
