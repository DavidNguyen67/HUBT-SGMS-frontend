'use client';

import { StudentFormValues } from '@interfaces';
import { DateField, Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography, Tag } from 'antd';

const { Title } = Typography;

const StudentShow = () => {
  const { queryResult } = useShow<StudentFormValues>({
    id: 'student_id',
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
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
      <TextField value={record?.class_name} />

      <Title level={5}>Ngày tạo</Title>
      <DateField value={record?.created_at} />
    </Show>
  );
};

export default StudentShow;
