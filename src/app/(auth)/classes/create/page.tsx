'use client';

import ClassForm from '@components/ClassForm';
import { ClassFormValues } from '@interfaces';
import { Create, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const ClassCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    ClassFormValues
  >({
    submitOnEnter: true,
    action: 'create',
    resource: 'api/v1/classes',
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Thêm lớp học"
      breadcrumb={null}
    >
      <Row>
        <Col span={16}>
          <ClassForm formProps={formProps} />
        </Col>
      </Row>
    </Create>
  );
};

export default ClassCreate;
