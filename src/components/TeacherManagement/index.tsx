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
import { fakeTeachers } from './seed';

const TeacherManagement = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List title="Quản lý giáo viên">
      <Table
        {...tableProps}
        rowKey="id"
        dataSource={fakeTeachers}
        tableLayout="fixed"
        loading={false}
      >
        <Table.Column
          dataIndex="id"
          title="Mã giáo viên"
          ellipsis
          width={100}
          render={(value: string) => (
            <Tooltip placement="topLeft" title={value}>
              <div style={{ width: 100, wordWrap: 'break-word' }}>
                {truncateText(value)}
              </div>
            </Tooltip>
          )}
        />
        <Table.Column dataIndex="full_name" title="Họ và tên" />
        <Table.Column dataIndex="subject" title="Môn học" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="phone_number" title="Số điện thoại" />
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

export default TeacherManagement;
