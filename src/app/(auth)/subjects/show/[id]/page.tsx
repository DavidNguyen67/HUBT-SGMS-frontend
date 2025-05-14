'use client';

import { SubjectFormValues } from '@interfaces';
import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography } from 'antd';

const { Title } = Typography;

const SubjectShow = () => {
  const { queryResult } = useShow<SubjectFormValues>({
    id: 'subject_id',
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />

      <Title level={5}>Mã môn học</Title>
      <TextField value={record?.subject_code} />

      <Title level={5}>Tên môn học</Title>
      <TextField value={record?.subject_name} />

      <Title level={5}>Số tín chỉ</Title>
      <TextField value={record?.credits} />

      <Title level={5}>Ngày tạo</Title>
      <TextField value={record?.created_at} />
    </Show>
  );
};

export default SubjectShow;
