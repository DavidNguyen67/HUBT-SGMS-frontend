'use client';

import { GradeFormValues } from '@interfaces';
import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography } from 'antd';

const { Title } = Typography;

const GradeShow = () => {
  const { queryResult } = useShow<GradeFormValues>({
    id: 'grade_id',
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />

      <Title level={5}>Tên loại điểm</Title>
      <TextField value={record?.grade_name} />

      <Title level={5}>Hệ số</Title>
      <TextField value={record?.coefficient} />

      <Title level={5}>Ngày tạo</Title>
      <TextField value={record?.created_at} />
    </Show>
  );
};

export default GradeShow;
