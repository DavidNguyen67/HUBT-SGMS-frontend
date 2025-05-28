'use client';

import WalletForm, { WalletFormValues } from '@components/WalletForm';
import { useAccount } from '@hooks';
import {
  DeleteButton,
  Edit,
  ListButton,
  RefreshButton,
  SaveButton,
  useForm,
} from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';

const StudentUpdate = () => {
  const { id } = useParams() as { id: string };

  const { formProps, saveButtonProps, queryResult } = useForm<
    any,
    HttpError,
    WalletFormValues
  >({
    submitOnEnter: true,
    action: 'edit',
    id,
    resource: 'api/v1/wallets',
    updateMutationOptions: {
      meta: {
        method: 'put',
      },
    },
  });
  const { sub } = useAccount();

  const initialValues = queryResult?.data?.data
    ? {
        ...queryResult.data.data,
        userId: queryResult.data.data?.user?.id ?? sub,
      }
    : undefined;

  return (
    <Edit
      breadcrumb={null}
      saveButtonProps={saveButtonProps}
      deleteButtonProps={{
        resource: 'api/v1/wallets',
      }}
      title="Chỉnh sửa ví"
      headerButtons={({ listButtonProps, refreshButtonProps }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách ví</ListButton>
          <RefreshButton {...refreshButtonProps} resource="api/v1/wallets">
            Làm mới
          </RefreshButton>
        </>
      )}
      footerButtons={({ saveButtonProps, deleteButtonProps }) => (
        <>
          <DeleteButton
            {...deleteButtonProps}
            confirmTitle="Bạn có chắc muốn xóa ví này không?"
            confirmOkText="Đồng ý"
            confirmCancelText="Hủy"
          >
            Xóa
          </DeleteButton>
          <SaveButton {...saveButtonProps}>Lưu</SaveButton>
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
    </Edit>
  );
};

export default StudentUpdate;
