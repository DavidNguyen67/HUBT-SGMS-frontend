'use client';

import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tooltip,
  Tag,
} from 'antd';
import { Transaction } from '@interfaces/response';
import { useAccount } from '@hooks';

const WalletManagement = () => {
  const { sub } = useAccount();

  const { tableProps, searchFormProps, tableQuery } = useTable<
    Transaction,
    HttpError
  >({
    syncWithLocation: true,
    resource: 'api/v1/transactions/all',
    meta: {
      externalFilters: {
        userId: sub,
      },
    },
  });

  return (
    <List
      title="Quản lý giao dịch"
      createButtonProps={{
        children: 'Thêm giao dịch',
      }}
    >
      <Table
        {...tableProps}
        rowKey="id"
        tableLayout="fixed"
        pagination={{
          ...tableProps.pagination,
          position: ['bottomCenter'],
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
        }}
        size="small"
      >
        <Table.Column<Transaction>
          dataIndex="id"
          title="Mã"
          width={60}
          ellipsis
          render={(value: string) => (
            <Tooltip title={value}>
              <div style={{ width: 60, wordWrap: 'break-word' }}>{value}</div>
            </Tooltip>
          )}
        />
        <Table.Column<Transaction>
          dataIndex="name"
          title="Tên giao dịch"
          width={180}
          ellipsis
        />
        <Table.Column<Transaction>
          dataIndex="amount"
          title="Số tiền"
          width={120}
          render={(_, record) =>
            record.category.income ? (
              <span style={{ color: 'green' }}>
                +{record.amount.toLocaleString('vi-VN')}
              </span>
            ) : (
              <span style={{ color: 'red' }}>
                -{record.amount.toLocaleString('vi-VN')}
              </span>
            )
          }
        />
        <Table.Column<Transaction>
          dataIndex="description"
          title="Mô tả"
          width={200}
          ellipsis
        />
        <Table.Column<Transaction>
          dataIndex="transactionDate"
          title="Ngày giao dịch"
          width={150}
          render={(date: string) => new Date(date).toLocaleDateString('vi-VN')}
        />
        <Table.Column<Transaction>
          dataIndex={['category', 'name']}
          title="Phân loại giao dịch"
          width={120}
          render={(_, record) => (
            <Tag color={record.category.income ? 'green' : 'red'}>
              {record.category.name}
            </Tag>
          )}
        />
        <Table.Column<Transaction>
          fixed="right"
          title="Thao tác"
          width={100}
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                resource="api/v1/transactions"
                confirmTitle="Bạn có chắc muốn xóa giao dịch này không?"
                confirmOkText="Đồng ý"
                confirmCancelText="Hủy"
                onSuccess={() => {
                  tableQuery.refetch();
                }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

export default WalletManagement;
