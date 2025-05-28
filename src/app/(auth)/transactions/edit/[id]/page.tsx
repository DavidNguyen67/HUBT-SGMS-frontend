'use client';

import CategoryForm, { CategoryFormValues } from '@components/CategoryForm';
import TransactionForm, {
  TransactionFormValues,
} from '@components/TransactionForm';
import { StudentFormValues } from '@interfaces';
import { Category, Transaction } from '@interfaces/response';
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
    Category,
    HttpError,
    TransactionFormValues
  >({
    submitOnEnter: true,
    action: 'edit',
    id,
    resource: 'api/v1/transactions',
    updateMutationOptions: {
      meta: {
        method: 'put',
      },
    },
  });

  const initialValues = queryResult?.data?.data
    ? {
        ...queryResult.data.data,
        transactionDate: queryResult.data.data?.transactionDate
          ? dayjs(queryResult.data.data?.transactionDate)
          : undefined,
        categoryId: queryResult.data.data?.category?.id,
        userId: queryResult.data.data?.user?.id,
        walletId: queryResult.data.data?.wallet?.id,
      }
    : undefined;

  return (
    <Edit
      breadcrumb={null}
      saveButtonProps={saveButtonProps}
      deleteButtonProps={{
        resource: 'api/v1/transactions',
      }}
      title="Chỉnh sửa giao dịch"
      headerButtons={({ listButtonProps, refreshButtonProps }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách giao dịch</ListButton>
          <RefreshButton {...refreshButtonProps} resource="api/v1/transactions">
            Làm mới
          </RefreshButton>
        </>
      )}
      footerButtons={({ saveButtonProps, deleteButtonProps }) => (
        <>
          <DeleteButton
            {...deleteButtonProps}
            confirmTitle="Bạn có chắc muốn xóa giao dịch này không?"
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
          <TransactionForm
            formProps={{ ...formProps, initialValues: initialValues }}
          />
        </Col>
      </Row>
    </Edit>
  );
};

export default StudentUpdate;
