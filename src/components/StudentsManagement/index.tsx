import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { HttpError, type BaseRecord } from '@refinedev/core';
import { Space, Table, Tag, Tooltip } from 'antd';
import React from 'react';
import { truncateText } from '@common/helper';

const StudentsManagement = () => {
  const { tableProps } = useTable<any, HttpError>({
    syncWithLocation: true,
    resource: 'api/v1/students',
    pagination: {
      mode: 'client',
    },
  });

  return (
    <List title="Quản lý sinh viên">
      <Table
        {...tableProps}
        rowKey="id"
        tableLayout="fixed"
        dataSource={tableProps.dataSource}
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
        <Table.Column dataIndex="student_code" title="Mã sinh viên" />
        <Table.Column dataIndex="full_name" title="Họ tên" />
        <Table.Column
          dataIndex="gender"
          title="Giới tính"
          render={(value: string) =>
            value === 'male' ? (
              <Tag color="blue">Nam</Tag>
            ) : (
              <Tag color="pink">Nữ</Tag>
            )
          }
        />
        <Table.Column dataIndex="date_of_birth" title="Ngày sinh" />
        <Table.Column dataIndex="class_name" title="Lớp" />
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

export default StudentsManagement;
