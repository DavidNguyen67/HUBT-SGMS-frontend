'use client';

import WalletForm, { WalletFormValues } from '@components/WalletForm';
import { useAccount } from '@hooks';
import { Create, SaveButton, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';
import { useParams } from 'next/navigation';

const StudentUpdate = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<
    any,
    HttpError,
    WalletFormValues
  >({
    submitOnEnter: true,
    action: 'create',
    resource: 'api/v1/wallets',
  });

  const { sub } = useAccount();

  const initialValues = {
    userId: sub,
  };

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Thêm ví"
      breadcrumb={null}
      footerButtons={({ saveButtonProps }) => (
        <>
          <SaveButton {...saveButtonProps}>Tạo</SaveButton>
        </>
      )}
    >
      <Row>
        <Col span={6} offset={8}>
          <WalletForm
            formProps={{ ...formProps, initialValues: initialValues }}
          />
        </Col>
      </Row>
    </Create>
  );
};

export default StudentUpdate;
