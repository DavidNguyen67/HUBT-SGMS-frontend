'use client';

import {
  DEFAULT_DATE_FORMAT,
  TAG_GENDER_COLOR_MAPPING,
  TAG_GENDER_MAPPING,
} from '@common';
import { Student } from '@interfaces/response';
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
  UserOutlined,
  IdcardOutlined,
  CalendarOutlined,
  TeamOutlined,
  FieldTimeOutlined,
  KeyOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const StudentShow = () => {
  const { id } = useParams() as { id: string };

  const { queryResult } = useShow<Student>({
    id,
    resource: 'api/v1/students',
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      breadcrumb={null}
      title="Chi tiết sinh viên"
      headerButtons={({
        listButtonProps,
        refreshButtonProps,
        editButtonProps,
        deleteButtonProps,
      }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách sinh viên</ListButton>
          <RefreshButton {...refreshButtonProps} resource="api/v1/students">
            Làm mới
          </RefreshButton>
          {editButtonProps && (
            <EditButton {...editButtonProps}>Chỉnh sửa</EditButton>
          )}
          {deleteButtonProps && (
            <DeleteButton
              {...deleteButtonProps}
              resource="api/v1/students"
              confirmTitle="Bạn có chắc muốn xóa sinh viên này không?"
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
        <UserOutlined style={{ marginRight: 8 }} />
        Thông tin chi tiết sinh viên
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
              <IdcardOutlined /> Mã sinh viên
            </>
          }
        >
          <Tag color="geekblue">{record?.student_code}</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <UserOutlined /> Họ tên
            </>
          }
        >
          <span style={{ fontWeight: 600, fontSize: 16 }}>
            {record?.full_name}
          </span>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <FieldTimeOutlined /> Ngày tạo
            </>
          }
        >
          <DateField value={record?.created_at} format={DEFAULT_DATE_FORMAT} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <TeamOutlined /> Lớp
            </>
          }
        >
          <Badge color="purple" text={record?.class?.class_name || '---'} />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <CalendarOutlined /> Ngày sinh
            </>
          }
        >
          <DateField
            value={record?.date_of_birth}
            format={DEFAULT_DATE_FORMAT}
          />
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <UserOutlined /> Giới tính
            </>
          }
        >
          <Tag color={TAG_GENDER_COLOR_MAPPING[record?.gender!]}>
            {TAG_GENDER_MAPPING[record?.gender!]}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};

export default StudentShow;
