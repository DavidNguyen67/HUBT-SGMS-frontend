'use client';

import { StudentFormValues } from '@interfaces';
import { Student } from '@interfaces/response';
import {
  Breadcrumb,
  DateField,
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
  Show,
  TextField,
} from '@refinedev/antd';
import { useBreadcrumb, useShow } from '@refinedev/core';
import { Typography, Tag } from 'antd';
import { useParams } from 'next/navigation';

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
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />

      <Title level={5}>Mã sinh viên</Title>
      <TextField value={record?.student_code} />

      <Title level={5}>Họ tên</Title>
      <TextField value={record?.full_name} />

      <Title level={5}>Giới tính</Title>
      {record?.gender === 'male' ? (
        <Tag color="blue">Nam</Tag>
      ) : (
        <Tag color="pink">Nữ</Tag>
      )}

      <Title level={5}>Ngày sinh</Title>
      <DateField value={record?.date_of_birth} format="DD/MM/YYYY" />

      <Title level={5}>Lớp</Title>
      <TextField value={record?.class?.class_name} />

      <Title level={5}>Ngày tạo</Title>
      <DateField value={record?.created_at} />
    </Show>
  );
};

export default StudentShow;
