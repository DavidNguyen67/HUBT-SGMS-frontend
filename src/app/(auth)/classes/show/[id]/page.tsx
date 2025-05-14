'use client';

import { useShow } from '@refinedev/core';
import { ClassFormValues } from '@interfaces';
import { Show, TextField, DateField } from '@refinedev/antd';
import { Typography } from 'antd';

const { Title } = Typography;

const ClassShow = () => {
  const { queryResult } = useShow<ClassFormValues>({
    id: 'class_id',
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />
      <Title level={5}>Mã lớp</Title>
      <TextField value={record?.class_code} />
      <Title level={5}>Tên lớp</Title>
      <TextField value={record?.class_name} />
      <Title level={5}>Ngày tạo</Title>
      <DateField value={record?.created_at} />
    </Show>
  );
};

export default ClassShow;
