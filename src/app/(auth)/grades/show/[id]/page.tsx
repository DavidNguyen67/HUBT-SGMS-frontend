'use client';

import { DEFAULT_DATE_FORMAT } from '@common';
import { GradeType } from '@interfaces/response';
import {
  DateField,
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
  Show,
} from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography, Descriptions, Tag } from 'antd';
import { useParams } from 'next/navigation';
import {
  KeyOutlined,
  BookOutlined,
  FieldTimeOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const GradeShow = () => {
  const { id } = useParams() as { id: string };

  const { queryResult } = useShow<GradeType>({
    id,
    resource: 'api/v1/grade-types',
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      breadcrumb={null}
      title="Chi tiết loại điểm"
      headerButtons={({
        listButtonProps,
        refreshButtonProps,
        editButtonProps,
        deleteButtonProps,
      }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách loại điểm</ListButton>
          <RefreshButton {...refreshButtonProps} resource="api/v1/grade-types">
            Làm mới
          </RefreshButton>
          {editButtonProps && (
            <EditButton {...editButtonProps}>Chỉnh sửa</EditButton>
          )}
          {deleteButtonProps && (
            <DeleteButton
              {...deleteButtonProps}
              resource="api/v1/grade-types"
              confirmTitle="Bạn có chắc muốn xóa loại điểm này không?"
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
        <BookOutlined style={{ marginRight: 8 }} />
        Thông tin chi tiết loại điểm
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
              <BookOutlined /> Tên loại điểm
            </>
          }
        >
          <span style={{ fontWeight: 600 }}>{record?.grade_name}</span>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <FieldTimeOutlined /> Hệ số
            </>
          }
        >
          <Tag color="purple">{record?.coefficient}</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <CalendarOutlined /> Ngày tạo
            </>
          }
        >
          <DateField value={record?.created_at} format={DEFAULT_DATE_FORMAT} />
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};

export default GradeShow;
