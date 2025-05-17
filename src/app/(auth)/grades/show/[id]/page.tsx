'use client';

import { DEFAULT_DATE_FORMAT } from '@common';
import { GradeType } from '@interfaces/response';
import {
  DateField,
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
  Show,
  TextField,
} from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography } from 'antd';
import { useParams } from 'next/navigation';

const { Title } = Typography;

const GradeShow = () => {
  const { id } = useParams() as { id: string };

  const { queryResult } = useShow<GradeType>({
    id,
    resource: 'api/v1/grade-types',
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      breadcrumb={null}
      title="Chi tiết loại điểm"
      headerButtons={({
        listButtonProps,
        refreshButtonProps,
        editButtonProps,
        deleteButtonProps,
      }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách loại điểm</ListButton>
          <RefreshButton {...refreshButtonProps} resource="api/v1/grade-types">
            Làm mới
          </RefreshButton>
          {editButtonProps && (
            <EditButton {...editButtonProps}>Chỉnh sửa</EditButton>
          )}
          {deleteButtonProps && (
            <DeleteButton
              {...deleteButtonProps}
              resource="api/v1/grade-types"
              confirmTitle="Bạn có chắc muốn xóa loại điểm này không?"
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

      <Title level={5}>Tên loại điểm</Title>
      <TextField value={record?.grade_name} />

      <Title level={5}>Hệ số</Title>
      <TextField value={record?.coefficient} />

      <Title level={5}>Ngày tạo</Title>
      <DateField value={record?.created_at} format={DEFAULT_DATE_FORMAT} />
    </Show>
  );
};

export default GradeShow;
