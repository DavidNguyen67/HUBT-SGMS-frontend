'use client';

import {
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
  Show,
  DateField,
} from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography, Tag, Table, Descriptions } from 'antd';
import {
  TAG_GENDER_MAPPING,
  TAG_GENDER_COLOR_MAPPING,
  DEFAULT_DATE_FORMAT,
} from '@common';
import { useParams } from 'next/navigation';
import { Teacher } from '@interfaces/response';
import {
  UserOutlined,
  IdcardOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const TeacherShow = () => {
  const { id } = useParams() as { id: string };

  const { queryResult } = useShow<Teacher>({
    id,
    resource: 'api/v1/teachers',
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      breadcrumb={null}
      title="Chi tiết giáo viên"
      headerButtons={({
        listButtonProps,
        refreshButtonProps,
        editButtonProps,
        deleteButtonProps,
      }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách giáo viên</ListButton>
          <RefreshButton {...refreshButtonProps} resource="api/v1/teachers">
            Làm mới
          </RefreshButton>
          {editButtonProps && (
            <EditButton {...editButtonProps}>Chỉnh sửa</EditButton>
          )}
          {deleteButtonProps && (
            <DeleteButton
              {...deleteButtonProps}
              resource="api/v1/teachers"
              confirmTitle="Bạn có chắc muốn xóa giáo viên này không?"
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
        Thông tin chi tiết giáo viên
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
              <IdcardOutlined /> Mã giáo viên
            </>
          }
        >
          <Tag color="geekblue" style={{ fontSize: 15 }}>
            {record?.teacher_code}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <UserOutlined /> Họ và tên
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
              <UserOutlined /> Giới tính
            </>
          }
        >
          {record?.gender && (
            <Tag color={TAG_GENDER_COLOR_MAPPING[record.gender]}>
              {TAG_GENDER_MAPPING[record.gender]}
            </Tag>
          )}
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
              <FieldTimeOutlined /> Ngày tạo
            </>
          }
        >
          <DateField value={record?.created_at} format={DEFAULT_DATE_FORMAT} />
        </Descriptions.Item>
      </Descriptions>

      <Title level={5} style={{ marginTop: 32 }}>
        Môn học - Lớp giảng dạy
      </Title>
      {record?.teacherSubjectClasses?.length ? (
        <div style={{ maxHeight: 240, overflowY: 'auto' }}>
          <Table
            dataSource={record.teacherSubjectClasses}
            rowKey="id"
            pagination={false}
            size="small"
            bordered
          >
            <Table.Column
              title="Môn học"
              dataIndex={['subject', 'subject_name']}
              key="subject"
            />
            <Table.Column
              title="Lớp học"
              dataIndex={['class', 'class_name']}
              key="class"
            />
          </Table>
        </div>
      ) : (
        <i>Chưa được phân công</i>
      )}
    </Show>
  );
};

export default TeacherShow;
