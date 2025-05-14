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
import fakeStudentGrades from './seed';
import { truncateText } from '@common/helper';

const StudentGradeManagement = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  return (
    <List title="Quản lý điểm sinh viên">
      <Table
        {...tableProps}
        rowKey="id"
        tableLayout="fixed"
        dataSource={fakeStudentGrades}
        loading={false}
      >
        <Table.Column
          dataIndex="id"
          title="Mã"
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
        <Table.Column dataIndex="student_name" title="Sinh viên" />
        <Table.Column dataIndex="subject_name" title="Môn học" />
        <Table.Column dataIndex="score" title="Điểm" />
        <Table.Column
          dataIndex="created_at"
          title="Ngày tạo"
          render={(value) => <DateField value={value} />}
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

export default StudentGradeManagement;
