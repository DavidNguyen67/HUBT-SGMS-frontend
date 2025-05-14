'use client';

import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { type BaseRecord } from '@refinedev/core';
import { Space, Table, Tooltip } from 'antd';
import React from 'react';
import { truncateText } from '@common/helper';
import { fakeGrades } from './seed';

const GradeManagement = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List title="Quản lý loại điểm">
      <Table
        {...tableProps}
        rowKey="id"
        dataSource={fakeGrades}
        tableLayout="fixed"
        loading={false}
      >
        <Table.Column
          dataIndex="id"
          title="Mã"
          ellipsis
          width={60}
          render={(value: string) => (
            <Tooltip placement="topLeft" title={value}>
              <div style={{ width: 60, wordWrap: 'break-word' }}>
                {truncateText(value)}
              </div>
            </Tooltip>
          )}
        />
        <Table.Column dataIndex="grade_name" title="Tên loại điểm" />
        <Table.Column dataIndex="coefficient" title="Hệ số" />
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

export default GradeManagement;
