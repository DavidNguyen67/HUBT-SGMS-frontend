'use client';

import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { BaseRecord } from '@refinedev/core';
import { Space, Table, Tooltip } from 'antd';
import React from 'react';
import { truncateText } from '@common/helper';
import fakeSubjects from './seed';

const SubjectManagement = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        dataSource={fakeSubjects}
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
              <div style={{ width: 60, wordWrap: 'break-word' }}>
                {truncateText(value)}
              </div>
            </Tooltip>
          )}
        />
        <Table.Column dataIndex="subject_code" title="Mã môn học" />
        <Table.Column dataIndex="subject_name" title="Tên môn học" />
        <Table.Column dataIndex="credits" title="Số tín chỉ" />
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

export default SubjectManagement;
