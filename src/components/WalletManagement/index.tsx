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
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Transaction, Wallet } from '@interfaces/response';
import { useAccount } from '@hooks';

const TransactionManagement = () => {
  const { sub } = useAccount();

  const { tableProps, searchFormProps, tableQuery } = useTable<
    Transaction,
    HttpError
  >({
    syncWithLocation: true,
    resource: 'api/v1/wallets/all',
    meta: {},
  });

  return (
    <List
      title="Quản lý ví"
      createButtonProps={{
        children: 'Thêm ví',
      }}
    >
      <Table
        {...tableProps}
        rowKey="id"
        bordered
        tableLayout="fixed"
        pagination={{
          ...tableProps.pagination,
          position: ['bottomCenter'],
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
        }}
        size="small"
      >
        <Table.Column<Wallet> title="Mã" dataIndex="id" width={60} ellipsis />
        <Table.Column<Wallet>
          title="Tên ví"
          dataIndex="name"
          width={180}
          ellipsis
        />
        <Table.Column<Wallet>
          title="Số dư"
          dataIndex="balance"
          width={120}
          render={(balance: number) => balance.toLocaleString('vi-VN')}
        />
        <Table.Column<Wallet>
          title="Ngày tạo"
          dataIndex="insertedAt"
          width={150}
          render={(date: string) => new Date(date).toLocaleDateString('vi-VN')}
        />
        <Table.Column<Wallet>
          title="Ngày cập nhật"
          dataIndex="updatedAt"
          width={150}
          render={(date: string) => new Date(date).toLocaleDateString('vi-VN')}
        />
        <Table.Column<Wallet>
          title="Trạng thái"
          dataIndex="deletedAt"
          width={100}
          render={(deletedAt: string | null) =>
            deletedAt ? (
              <Tag color="red">Đã xóa</Tag>
            ) : (
              <Tag color="green">Hoạt động</Tag>
            )
          }
        />
        <Table.Column<Wallet>
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
                resource="api/v1/wallets"
                confirmTitle="Bạn có chắc muốn xóa ví này không?"
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

export default TransactionManagement;
