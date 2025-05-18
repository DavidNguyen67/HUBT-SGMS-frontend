'use client';

import { useShow } from '@refinedev/core';
import {
  Show,
  DateField,
  ListButton,
  RefreshButton,
  EditButton,
  DeleteButton,
} from '@refinedev/antd';
import { Typography, Descriptions, Tag } from 'antd';
import { useParams } from 'next/navigation';
import { TeacherSubjectClass } from '@interfaces/response';
import { DEFAULT_DATE_FORMAT } from '@common';
import {
  BookOutlined,
  UserOutlined,
  IdcardOutlined,
  FieldTimeOutlined,
  KeyOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const TeacherSubjectClassShow = () => {
  const { id } = useParams() as { id: string };

  const { queryResult } = useShow<TeacherSubjectClass>({
    id,
    resource: 'api/v1/teacher-subject-classes',
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      breadcrumb={null}
      title="Chi tiết phân công giảng dạy"
      headerButtons={({
        listButtonProps,
        refreshButtonProps,
        editButtonProps,
        deleteButtonProps,
      }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách phân công</ListButton>
          <RefreshButton {...refreshButtonProps}>Làm mới</RefreshButton>
          {editButtonProps && (
            <EditButton {...editButtonProps}>Chỉnh sửa</EditButton>
          )}
          {deleteButtonProps && (
            <DeleteButton
              {...deleteButtonProps}
              resource="api/v1/teacher-subject-classes"
              confirmTitle="Bạn có chắc muốn xóa phân công này không?"
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
        Thông tin chi tiết phân công giảng dạy
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
          <DateField value={record?.created_at} format={DEFAULT_DATE_FORMAT} />
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <UserOutlined /> Giáo viên
            </>
          }
        >
          <Tag color="blue">{record?.teacher?.full_name}</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <IdcardOutlined /> Mã giáo viên
            </>
          }
        >
          <Tag>{record?.teacher?.teacher_code}</Tag>
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <BookOutlined /> Môn học
            </>
          }
        >
          <Tag color="purple">{record?.subject?.subject_name}</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <IdcardOutlined /> Mã môn học
            </>
          }
        >
          <Tag>{record?.subject?.subject_code}</Tag>
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <TeamOutlined /> Lớp học
            </>
          }
        >
          <Tag color="geekblue">{record?.class?.class_name}</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <IdcardOutlined /> Mã lớp
            </>
          }
        >
          <Tag>{record?.class?.class_code}</Tag>
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};

export default TeacherSubjectClassShow;
