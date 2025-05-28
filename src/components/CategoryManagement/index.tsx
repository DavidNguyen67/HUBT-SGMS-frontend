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
  Tag,
  Tooltip,
} from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useAccount } from '@hooks';

interface Category {
  id: string;
  name: string;
  income: boolean;
}

const CategoryManagement = () => {
  const { sub } = useAccount();

  const { tableProps, searchFormProps, tableQuery } = useTable<
    Category,
    HttpError
  >({
    syncWithLocation: true,
    resource: 'api/v1/categories/all',
    meta: {},
  });

  return (
    <List
      title="Quản lý Phân loại giao dịch"
      createButtonProps={{
        children: 'Thêm Phân loại giao dịch',
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
        <Table.Column<Category>
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
        <Table.Column<Category>
          dataIndex="name"
          title="Tên Phân loại giao dịch"
          width={180}
          ellipsis
        />
        <Table.Column<Category>
          dataIndex="income"
          title="Loại"
          width={100}
          render={(income: boolean) =>
            income ? (
              <Tag color="green">Thu nhập</Tag>
            ) : (
              <Tag color="red">Chi tiêu</Tag>
            )
          }
        />
        <Table.Column<Category>
          fixed="right"
          title="Thao tác"
          width={120}
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                resource="api/v1/categories"
                confirmTitle="Bạn có chắc muốn xóa Phân loại giao dịch này không?"
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

export default CategoryManagement;
