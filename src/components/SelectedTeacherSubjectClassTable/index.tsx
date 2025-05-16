'use client';

import { Table, Tooltip } from 'antd';
import { DateField, useTable } from '@refinedev/antd';
import { TeacherSubjectClass } from '@interfaces/response';
import { truncateText } from '@common/helper';
import { HttpError } from '@refinedev/core';

interface SelectedTeacherSubjectClassTableProps {
  ids?: string[];
}

const SelectedTeacherSubjectClassTable = ({
  ids,
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
      size="small"
      rowKey="id"
      pagination={false}
      dataSource={tableProps.dataSource}
      style={{ marginTop: 12 }}
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
      />
      <Table.Column
        title="Môn học"
        dataIndex={['subject', 'subject_name']}
        render={(value: string) => (
          <Tooltip title={value}>{truncateText(value)}</Tooltip>
        )}
      />
      <Table.Column
        title="Lớp học"
        dataIndex={['class', 'class_name']}
        render={(value: string) => (
          <Tooltip title={value}>{truncateText(value)}</Tooltip>
        )}
      />
      <Table.Column
        title="Ngày tạo"
        dataIndex="created_at"
        render={(value: string) => (
          <DateField value={value} format="DD/MM/YYYY" />
        )}
        sorter={(a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        }
      />
    </Table>
  );
};

export default SelectedTeacherSubjectClassTable;
