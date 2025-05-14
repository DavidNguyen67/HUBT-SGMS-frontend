'use client';

import { Teacher } from '@interfaces';
import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography } from 'antd';

const { Title } = Typography;

const TeacherShow = () => {
  const { queryResult } = useShow<Teacher>({
    id: 'teacher_id',
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Mã giáo viên</Title>
      <TextField value={record?.id} />

      <Title level={5}>Họ và tên</Title>
      <TextField value={record?.full_name} />

      <Title level={5}>Giới tính</Title>
      <TextField value={record?.gender} />

      <Title level={5}>Ngày sinh</Title>
      <TextField value={record?.date_of_birth} />

      <Title level={5}>Môn học</Title>
      <TextField value={record?.subject} />

      <Title level={5}>Email</Title>
      <TextField value={record?.email} />

      <Title level={5}>Số điện thoại</Title>
      <TextField value={record?.phone_number} />

      <Title level={5}>Địa chỉ</Title>
      <TextField value={record?.address} />

      <Title level={5}>Ngày tạo</Title>
      <TextField value={record?.created_at} />
    </Show>
  );
};

export default TeacherShow;
