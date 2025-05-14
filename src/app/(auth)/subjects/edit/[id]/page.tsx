'use client';

import SubjectForm from '@components/SubjectForm';
import { SubjectFormValues } from '@interfaces';
import { Edit, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const SubjectUpdate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    SubjectFormValues
  >({
    submitOnEnter: true,
    action: 'edit',
    id: 'subject_id',
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Row>
        <Col span={6} offset={8}>
          <SubjectForm formProps={formProps} />
        </Col>
      </Row>
    </Edit>
  );
};

export default SubjectUpdate;
