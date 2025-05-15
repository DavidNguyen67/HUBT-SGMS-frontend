'use client';

import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { CrudFilters, HttpError, BaseRecord } from '@refinedev/core';
import { Button, Form, Input, Space, Table, Tooltip } from 'antd';
import { truncateText } from '@common/helper';
import { Class, Student, TeacherSubjectClass } from '@interfaces/response';
import { ClassTableFilter } from '@interfaces';

const ClassesManagement = () => {
  const { tableProps, searchFormProps } = useTable<
    Class,
    HttpError,
    ClassTableFilter
  >({
    syncWithLocation: true,
    resource: 'api/v1/classes',
    onSearch: (values) => {
      const filters: CrudFilters = [];

      if (values.class_name != null) {
        filters.push({
          field: 'class_name',
          operator: 'contains',
          value: values.class_name,
        });
      }

      if (values.class_code != null) {
        filters.push({
          field: 'class_code',
          operator: 'contains',
          value: values.class_code,
        });
      }

      if (values.subject_name != null) {
        filters.push({
          field: 'subject_name',
          operator: 'contains',
          value: values.subject_name,
        });
      }

      if (values.teacher_name != null) {
        filters.push({
          field: 'teacher_name',
          operator: 'contains',
          value: values.teacher_name,
        });
      }

      return filters;
    },
  });

  return (
    <List
      title="Quản lý lớp học"
      createButtonProps={{
        children: 'Thêm lớp học',
      }}
    >
      <Form
        layout="inline"
        {...searchFormProps}
        style={{ marginBottom: 16, display: 'flex', gap: 8 }}
      >
        <Form.Item name="class_name" label="Tên lớp">
          <Input placeholder="Tìm theo tên lớp..." allowClear />
        </Form.Item>

        <Form.Item name="class_code" label="Mã lớp">
          <Input placeholder="Tìm theo mã lớp..." allowClear />
        </Form.Item>

        <Form.Item name="teacher_name" label="Tên giáo viên">
          <Input placeholder="Tìm theo mã lớp..." allowClear />
        </Form.Item>

        <Form.Item name="subject_name" label="Tên môn học">
          <Input placeholder="Tìm theo môn học..." allowClear />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Lọc
          </Button>
        </Form.Item>
      </Form>

      <Table
        {...tableProps}
        rowKey="id"
        tableLayout="fixed"
        pagination={{
          ...tableProps.pagination,
          position: ['bottomCenter'],
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total) => `Tổng cộng ${total} lớp học`,
        }}
      >
        <Table.Column
          dataIndex="id"
          title="Mã"
          width={60}
          ellipsis
          render={(value: string) => (
            <Tooltip title={value}>
              <div style={{ width: 60, wordWrap: 'break-word' }}>
                {truncateText(value)}
              </div>
            </Tooltip>
          )}
        />

        <Table.Column
          dataIndex="class_code"
          title="Mã lớp"
          width={120}
          sorter={{ multiple: 1 }}
        />

        <Table.Column
          dataIndex="class_name"
          title="Tên lớp"
          width={200}
          sorter={{ multiple: 2 }}
        />

        <Table.Column
          dataIndex="studentCount"
          title="Số học sinh"
          sorter={{ multiple: 3 }}
        />

        <Table.Column
          dataIndex="teacherSubjectClasses"
          title="Giáo viên - Môn học"
          render={(items: TeacherSubjectClass[]) => {
            const tooltipContent = (
              <div>
                {items?.map((item, idx) => (
                  <div key={idx}>
                    <b>{item.teacher?.full_name || '-'}</b> -{' '}
                    {item.subject?.subject_name || 'Chưa rõ'}
                  </div>
                )) || '-'}
              </div>
            );

            const displayContent = items
              ?.map(
                (item) =>
                  `${item.teacher?.full_name} - ${item.subject?.subject_name}`
              )
              .join(' | ');

            return (
              <Tooltip title={tooltipContent}>
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 200,
                  }}
                >
                  {displayContent}
                </div>
              </Tooltip>
            );
          }}
        />

        <Table.Column
          title="Thao tác"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                resource="api/v1/classes"
                confirmTitle="Bạn có chắc muốn xóa lớp học này không?"
                confirmOkText="Đồng ý"
                confirmCancelText="Hủy"
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

export default ClassesManagement;
