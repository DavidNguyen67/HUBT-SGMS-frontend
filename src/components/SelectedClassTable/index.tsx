'use client';

import { Button, Table, Tooltip } from 'antd';
import { PAGE_SIZE_OPTIONS } from '@common';
import { useTable } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Class, TeacherSubjectClass } from '@interfaces/response';
import { truncateText } from '@common/helper';
import { DeleteOutlined } from '@ant-design/icons';

interface SelectedClassTableProps {
  ids?: string[];
  onRemoveId?: (id: string) => void;
}

const SelectedClassTable = ({ ids, onRemoveId }: SelectedClassTableProps) => {
  const { tableProps } = useTable<Class, HttpError>({
    resource: 'api/v1/classes',
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
        dataIndex="class_name"
        title="Tên lớp"
        width={180}
        sorter={(a, b) => a.class_name.localeCompare(b.class_name)}
        filters={
          tableProps.dataSource?.map((cls) => ({
            text: cls.class_name,
            value: cls.class_name,
          })) ?? []
        }
        onFilter={(value, record) => record.class_name.includes(value)}
      />

      <Table.Column
        title="Hành động"
        key="action"
        fixed="right"
        width={100}
        render={(_, record: Class) => (
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

export default SelectedClassTable;
