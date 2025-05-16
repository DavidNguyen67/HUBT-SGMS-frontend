'use client';

import { Table, Tooltip, Button } from 'antd';
import { DateField, useTable } from '@refinedev/antd';
import { TeacherSubjectClass } from '@interfaces/response';
import { truncateText } from '@common/helper';
import { HttpError } from '@refinedev/core';
import { DeleteOutlined } from '@ant-design/icons';
import { PAGE_SIZE_OPTIONS } from '@common';

interface SelectedTeacherSubjectClassTableProps {
  ids?: string[];
  onRemoveId?: (id: string) => void;
}

const SelectedTeacherSubjectClassTable = ({
  ids,
  onRemoveId,
}: SelectedTeacherSubjectClassTableProps) => {
  const { tableProps } = useTable<TeacherSubjectClass, HttpError>({
    resource: 'api/v1/teacher-subject-classes',
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
        showTotal: (total) => `Tổng cộng ${total} bản ghi`,
      }}
    >
      <Table.Column
        title="Giáo viên"
        dataIndex={['teacher', 'full_name']}
        filters={
          tableProps.dataSource?.map((item) => ({
            text: item.teacher.full_name,
            value: item.teacher.full_name,
          })) ?? []
        }
        onFilter={(value, record) =>
          record.teacher.full_name.includes(value as string)
        }
        render={(value: string) => (
          <Tooltip title={value}>{truncateText(value)}</Tooltip>
        )}
        sorter={{ multiple: 1 }}
      />
      <Table.Column
        title="Mã GV"
        dataIndex={['teacher', 'teacher_code']}
        width={100}
        filters={
          tableProps.dataSource?.map((item) => ({
            text: item.teacher.teacher_code,
            value: item.teacher.teacher_code,
          })) ?? []
        }
        onFilter={(value, record) =>
          record.teacher.teacher_code.includes(value as string)
        }
        sorter={{ multiple: 2 }}
      />
      <Table.Column
        title="Môn học"
        dataIndex={['subject', 'subject_name']}
        render={(value: string) => (
          <Tooltip title={value}>{truncateText(value)}</Tooltip>
        )}
        filters={
          tableProps.dataSource?.map((item) => ({
            text: item.subject.subject_name,
            value: item.subject.subject_name,
          })) ?? []
        }
        onFilter={(value, record) =>
          record.subject.subject_name.includes(value as string)
        }
        sorter={{ multiple: 3 }}
      />

      <Table.Column
        title="Lớp học"
        dataIndex={['class', 'class_name']}
        render={(value: string) => (
          <Tooltip title={value}>{truncateText(value)}</Tooltip>
        )}
        filters={
          tableProps.dataSource?.map((item) => ({
            text: item.class.class_name,
            value: item.class.class_name,
          })) ?? []
        }
        onFilter={(value, record) =>
          record.class.class_name.includes(value as string)
        }
        sorter={{ multiple: 4 }}
      />

      <Table.Column
        title="Ngày tạo"
        dataIndex="created_at"
        render={(value: string) => (
          <DateField value={value} format="DD/MM/YYYY" />
        )}
        sorter={{ multiple: 5 }}
      />
      <Table.Column
        title="Hành động"
        key="action"
        fixed="right"
        width={100}
        render={(_, record: TeacherSubjectClass) => (
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

export default SelectedTeacherSubjectClassTable;
