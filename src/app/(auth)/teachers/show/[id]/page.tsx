'use client';

import {
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
  Show,
  TextField,
  DateField,
} from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography, Tag, Table } from 'antd';
import {
  TAG_GENDER_MAPPING,
  TAG_GENDER_COLOR_MAPPING,
  DEFAULT_DATE_FORMAT,
} from '@common';
import { useParams } from 'next/navigation';
import { Teacher } from '@interfaces/response';

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
      <Title level={5}>Mã giáo viên</Title>
      <TextField value={record?.teacher_code} />

      <Title level={5}>Họ và tên</Title>
      <TextField value={record?.full_name} />

      <Title level={5}>Giới tính</Title>
      {record?.gender && (
        <Tag color={TAG_GENDER_COLOR_MAPPING[record.gender]}>
          {TAG_GENDER_MAPPING[record.gender]}
        </Tag>
      )}

      <Title level={5}>Ngày sinh</Title>
      <DateField value={record?.date_of_birth} format={DEFAULT_DATE_FORMAT} />

      <Title level={5}>Môn học - Lớp giảng dạy</Title>
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

      <Title level={5}>Ngày tạo</Title>
      <DateField value={record?.created_at} format={DEFAULT_DATE_FORMAT} />
    </Show>
  );
};

export default TeacherShow;
