'use client';

import {
  DateField,
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
  Show,
} from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography, Tag, Descriptions, Badge } from 'antd';
import { useParams } from 'next/navigation';
import {
  KeyOutlined,
  FieldTimeOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const CategoryShow = () => {
  const { id } = useParams() as { id: string };

  const { queryResult } = useShow({
    id,
    resource: 'api/v1/transactions',
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      breadcrumb={null}
      title="Chi tiết Phân loại giao dịch"
      headerButtons={({
        listButtonProps,
        refreshButtonProps,
        editButtonProps,
        deleteButtonProps,
      }) => (
        <>
          <ListButton {...listButtonProps}>
            Danh sách Phân loại giao dịch
          </ListButton>
          <RefreshButton {...refreshButtonProps}>Làm mới</RefreshButton>
          {editButtonProps && (
            <EditButton {...editButtonProps}>Chỉnh sửa</EditButton>
          )}
          {deleteButtonProps && (
            <DeleteButton
              {...deleteButtonProps}
              confirmTitle="Bạn có chắc muốn xóa Phân loại giao dịch này không?"
              confirmOkText="Đồng ý"
              confirmCancelText="Hủy"
            >
              Xóa
            </DeleteButton>
          )}
        </>
      )}
    >
      <Title level={4} style={{ marginBottom: 24 }}>
        <KeyOutlined style={{ marginRight: 8 }} />
        Thông tin chi tiết Phân loại giao dịch
      </Title>
      <Descriptions
        bordered
        column={2}
        size="middle"
        labelStyle={{ fontWeight: 600 }}
      >
        <Descriptions.Item
          label={
            <>
              <KeyOutlined /> ID
            </>
          }
        >
          {record?.id}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <FieldTimeOutlined /> Ngày tạo
            </>
          }
        >
          <DateField value={record?.insertedAt} format="DD/MM/YYYY HH:mm:ss" />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <FieldTimeOutlined /> Ngày cập nhật
            </>
          }
        >
          <DateField value={record?.updatedAt} format="DD/MM/YYYY HH:mm:ss" />
        </Descriptions.Item>
        <Descriptions.Item label="Ngày xóa">
          {record?.deletedAt ? (
            <DateField value={record?.deletedAt} format="DD/MM/YYYY HH:mm:ss" />
          ) : (
            <Tag color="green">Chưa xóa</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <UserOutlined /> Tên Phân loại giao dịch
            </>
          }
        >
          <span style={{ fontWeight: 600, fontSize: 16 }}>{record?.name}</span>
        </Descriptions.Item>
        <Descriptions.Item label="User">
          {record?.user ? (
            typeof record.user === 'object' ? (
              record.user.email || record.user.id || JSON.stringify(record.user)
            ) : (
              record.user
            )
          ) : (
            <Tag color="default">Không có</Tag>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Thu nhập">
          {record?.income ? (
            <Tag icon={<CheckCircleOutlined />} color="success"></Tag>
          ) : (
            <Tag icon={<CloseCircleOutlined />} color="error"></Tag>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};

export default CategoryShow;
// ...existing code...
