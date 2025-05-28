'use client';

import CategoryForm, { CategoryFormValues } from '@components/CategoryForm';
import { Create, SaveButton, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';
import { useParams } from 'next/navigation';

const StudentUpdate = () => {
  const { id } = useParams() as { id: string };

  const { formProps, saveButtonProps, queryResult } = useForm<
    any,
    HttpError,
    CategoryFormValues
  >({
    submitOnEnter: true,
    action: 'create',
    id,
    resource: 'api/v1/categories',
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Thêm phân loại"
      breadcrumb={null}
      footerButtons={({ saveButtonProps }) => (
        <>
          <SaveButton {...saveButtonProps}>Tạo</SaveButton>
        </>
      )}
    >
      <Row>
        <Col span={6} offset={8}>
          <CategoryForm formProps={formProps} />
        </Col>
      </Row>
    </Create>
  );
};

export default StudentUpdate;
