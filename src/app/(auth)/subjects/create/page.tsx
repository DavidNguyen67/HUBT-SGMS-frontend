'use client';

import SubjectForm from '@components/SubjectForm';
import { SubjectFormValues } from '@interfaces';
import { Create, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const SubjectCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    SubjectFormValues
  >({
    submitOnEnter: true,
    action: 'create',
    resource: 'api/v1/subjects',
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Thêm môn học"
      breadcrumb={null}
    >
      <Row>
        <Col span={16}>
          <SubjectForm formProps={formProps} />
        </Col>
      </Row>
    </Create>
  );
};

export default SubjectCreate;
