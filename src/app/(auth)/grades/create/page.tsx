'use client';

import GradeForm from '@components/GradeForm';
import { GradeTypeFormValues } from '@interfaces';
import { Create, Edit, SaveButton, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const GradeCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    GradeTypeFormValues
  >({
    submitOnEnter: true,
    action: 'create',
    resource: 'api/v1/grade-types',
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Thêm loại điểm"
      breadcrumb={null}
      footerButtons={({ saveButtonProps }) => (
        <>
          <SaveButton {...saveButtonProps}>Tạo</SaveButton>
        </>
      )}
    >
      <Row>
        <Col span={6} offset={8}>
          <GradeForm formProps={formProps} />
        </Col>
      </Row>
    </Create>
  );
};

export default GradeCreate;
