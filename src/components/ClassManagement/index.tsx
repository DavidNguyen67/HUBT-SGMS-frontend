'use client';

import {
  List,
  useTable,
  DeleteButton,
  EditButton,
  ShowButton,
  DateField,
} from '@refinedev/antd';
import { Table, Space, Tooltip } from 'antd';
import { BaseRecord } from '@refinedev/core';
import { truncateText } from '@common/helper';
import { classSeedData } from './seed';

const ClassManagement = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        dataSource={classSeedData}
        loading={false}
        tableLayout="fixed"
      >
        <Table.Column
          dataIndex="id"
          title="Mã"
          ellipsis
          width={60}
          render={(value: string) => (
            <Tooltip placement="topLeft" title={value}>
              <div
                style={{
                  width: 60,
                  wordWrap: 'break-word',
                  wordBreak: 'break-word',
                }}
              >
                {truncateText(value)}
              </div>
            </Tooltip>
          )}
        />
        <Table.Column dataIndex="class_code" title="Mã lớp" />
        <Table.Column dataIndex="class_name" title="Tên lớp" />
        <Table.Column
          dataIndex="created_at"
          title="Ngày tạo"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title="Thao tác"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

export default ClassManagement;
