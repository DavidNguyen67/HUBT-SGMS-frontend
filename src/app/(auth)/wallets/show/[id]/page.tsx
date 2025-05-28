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
import { Typography, Tag, Descriptions } from 'antd';
import { useParams } from 'next/navigation';
import {
  KeyOutlined,
  FieldTimeOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const WalletShow = () => {
  const { id } = useParams() as { id: string };

  const { queryResult } = useShow({
    id,
    resource: 'api/v1/wallets',
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      breadcrumb={null}
      title="Chi tiết Ví"
      headerButtons={({
        listButtonProps,
        refreshButtonProps,
        editButtonProps,
        deleteButtonProps,
      }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách Ví</ListButton>
          <RefreshButton {...refreshButtonProps}>Làm mới</RefreshButton>
          {editButtonProps && (
            <EditButton {...editButtonProps}>Chỉnh sửa</EditButton>
          )}
          {deleteButtonProps && (
            <DeleteButton
              {...deleteButtonProps}
              confirmTitle="Bạn có chắc muốn xóa ví này không?"
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
        <WalletOutlined style={{ marginRight: 8 }} />
        Thông tin chi tiết Ví
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
              <WalletOutlined /> Tên ví
            </>
          }
        >
          <span style={{ fontWeight: 600, fontSize: 16 }}>{record?.name}</span>
        </Descriptions.Item>
        <Descriptions.Item label="Số dư">
          <span style={{ fontWeight: 600, fontSize: 16 }}>
            {record?.balance?.toLocaleString('vi-VN')} đ
          </span>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <UserOutlined /> Người dùng
            </>
          }
        >
          {record?.user ? (
            typeof record.user === 'object' ? (
              <>
                {record.user.email}
                <br />
                {record.user.firstName} {record.user.lastName}
              </>
            ) : (
              record.user
            )
          ) : (
            <Tag color="default">Không có</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};

export default WalletShow;
