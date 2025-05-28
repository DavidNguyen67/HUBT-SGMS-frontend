'use client';

import TransactionForm, {
  TransactionFormValues,
} from '@components/TransactionForm';
import { Create, SaveButton, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';
import { useParams } from 'next/navigation';

const StudentUpdate = () => {
  const { id } = useParams() as { id: string };

  const { formProps, saveButtonProps, queryResult } = useForm<
    any,
    HttpError,
    TransactionFormValues
  >({
    submitOnEnter: true,
    action: 'create',
    id,
    resource: 'api/v1/transactions',
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Thêm giao dịch"
      breadcrumb={null}
      footerButtons={({ saveButtonProps }) => (
        <>
          <SaveButton {...saveButtonProps}>Tạo</SaveButton>
        </>
      )}
    >
      <Row>
        <Col span={6} offset={8}>
          <TransactionForm formProps={formProps} />
        </Col>
      </Row>
    </Create>
  );
};

export default StudentUpdate;
