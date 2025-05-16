'use client';

import { Button, Table, Tag, Tooltip } from 'antd';
import {
  GENDER,
  PAGE_SIZE_OPTIONS,
  TAG_GENDER_COLOR_MAPPING,
  TAG_GENDER_MAPPING,
} from '@common';
import { DateField, useTable } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Teacher } from '@interfaces/response';
import { truncateText } from '@common/helper';
import { DeleteOutlined } from '@ant-design/icons';

interface SelectedTeacherTableProps {
  ids?: string[];
  onRemoveId?: (id: string) => void;
}

const SelectedTeacherTable = ({
  ids,
  onRemoveId,
}: SelectedTeacherTableProps) => {
  const { tableProps } = useTable<Teacher, HttpError>({
    resource: 'api/v1/teachers',
    syncWithLocation: false,
    meta: {
      externalFilters: {
        ids: Array.isArray(ids) ? ids.join(',') : ids,
      },
    },
  });

  return (
    <Table
      {...tableProps}
      size="small"
      rowKey="id"
      style={{ marginTop: 12 }}
      pagination={{
        ...tableProps.pagination,
        position: ['bottomCenter'],
        showSizeChanger: true,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        defaultPageSize: +PAGE_SIZE_OPTIONS[0],
      }}
    >
      <Table.Column
        dataIndex="id"
        title="Mã"
        ellipsis
        width={60}
        render={(value: string) => (
          <Tooltip title={value}>
            <div style={{ width: 60 }}>{truncateText(value)}</div>
          </Tooltip>
        )}
      />
      <Table.Column
        dataIndex="teacher_code"
        title="Mã giáo viên"
        width={120}
        sorter={(a, b) => a.teacher_code.localeCompare(b.teacher_code)}
        filters={
          tableProps.dataSource?.map((t) => ({
            text: t.teacher_code,
            value: t.teacher_code,
          })) ?? []
        }
        onFilter={(value, record) => record.teacher_code.includes(value)}
      />
      <Table.Column
        dataIndex="full_name"
        title="Họ tên"
        width={180}
        sorter={(a, b) => a.full_name.localeCompare(b.full_name)}
        filters={
          tableProps.dataSource?.map((t) => ({
            text: t.full_name,
            value: t.full_name,
          })) ?? []
        }
        onFilter={(value, record) => record.full_name.includes(value)}
      />
      <Table.Column
        dataIndex="gender"
        title="Giới tính"
        render={(value: GENDER) => (
          <Tag color={TAG_GENDER_COLOR_MAPPING[value]}>
            {TAG_GENDER_MAPPING[value]}
          </Tag>
        )}
        sorter={{ multiple: 3 }}
        filters={[
          { text: 'Nam', value: 'male' },
          { text: 'Nữ', value: 'female' },
          { text: 'Khác', value: 'other' },
        ]}
        onFilter={(value, record) => record.gender === value}
        width={120}
      />
      <Table.Column
        dataIndex="date_of_birth"
        title="Ngày sinh"
        sorter={{ multiple: 3 }}
        render={(value: string) => (
          <DateField value={value} format="DD/MM/YYYY" />
        )}
      />
      <Table.Column
        title="Hành động"
        key="action"
        fixed="right"
        width={100}
        render={(_, record: Teacher) => (
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => {
              onRemoveId?.(record.id);
            }}
          />
        )}
      />
    </Table>
  );
};

export default SelectedTeacherTable;
