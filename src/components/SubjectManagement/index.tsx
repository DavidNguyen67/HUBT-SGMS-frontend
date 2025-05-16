'use client';

import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useSelect,
  useTable,
} from '@refinedev/antd';
import { BaseRecord, CrudFilters, HttpError } from '@refinedev/core';
import { Button, Form, Input, Select, Space, Table, Tag, Tooltip } from 'antd';
import React from 'react';
import { truncateText } from '@common/helper';
import { SubjectTableFilter } from '@interfaces';
import {
  Class,
  StudentGrade,
  Subject,
  Teacher,
  TeacherSubjectClass,
} from '@interfaces/response';
import { SelectProps } from 'antd/lib';
import { MAX_TAGS_DISPLAY } from '@common';

const SubjectManagement = () => {
  const { tableProps, searchFormProps } = useTable<
    Subject,
    HttpError,
    SubjectTableFilter
  >({
    syncWithLocation: true,
    resource: 'api/v1/subjects',
    onSearch: (values) => {
      const filters: CrudFilters = [];

      if (values.subject_name != null) {
        filters.push({
          field: 'subject_name',
          operator: 'contains',
          value: values.subject_name || undefined,
        });
      }

      if (values.subject_code != null) {
        filters.push({
          field: 'subject_code',
          operator: 'contains',
          value: values.subject_code || undefined,
        });
      }

      if (values.class_id != null) {
        filters.push({
          field: 'class_id',
          operator: 'contains',
          value: values.class_id || undefined,
        });
      }

      if (values.credits != null) {
        filters.push({
          field: 'credits',
          operator: 'contains',
          value: values.credits || undefined,
        });
      }

      if (values.teacher_id != null) {
        filters.push({
          field: 'teacher_id',
          operator: 'contains',
          value: values.teacher_id || undefined,
        });
      }

      return filters;
    },
  });

  const { selectProps: teacherSelectProps } = useSelect<Teacher>({
    resource: 'api/v1/teachers',
    optionLabel: (item) => item?.full_name,
    optionValue: 'id',
    onSearch: (value) => [
      {
        field: 'value',
        operator: 'contains',
        value,
      },
    ],
    meta: {
      externalFilters: {
        _end: 50,
      },
    },
  });

  const { selectProps: classSelectProps } = useSelect<Class>({
    resource: 'api/v1/classes',
    optionLabel: (item) => item?.class_name,
    optionValue: 'id',
    onSearch: (value) => [
      {
        field: 'value',
        operator: 'contains',
        value,
      },
    ],
    meta: {
      externalFilters: {
        _end: 50,
      },
    },
  });

  return (
    <List
      title="Quản lý môn học"
      createButtonProps={{
        children: 'Thêm môn học',
      }}
    >
      <Form
        layout="inline"
        {...searchFormProps}
        style={{ marginBottom: 16, display: 'flex', gap: 8 }}
      >
        <Form.Item
          name="subject_code"
          label={<div style={{ width: 80, textAlign: 'left' }}>Mã môn học</div>}
        >
          <Input
            placeholder="Tìm theo mã môn..."
            allowClear
            style={{ width: 250 }}
          />
        </Form.Item>

        <Form.Item
          name="subject_name"
          label={
            <div style={{ width: 80, textAlign: 'left' }}>Tên môn học</div>
          }
        >
          <Input
            placeholder="Tìm theo tên môn..."
            allowClear
            style={{ width: 250 }}
          />
        </Form.Item>

        <Form.Item
          name="credits"
          label={<div style={{ width: 80, textAlign: 'left' }}>Số tín chỉ</div>}
        >
          <Select
            placeholder="Chọn số tín chỉ"
            allowClear
            style={{ width: 250 }}
          >
            <Select.Option value={1}>1</Select.Option>
            <Select.Option value={2}>2</Select.Option>
            <Select.Option value={3}>3</Select.Option>
            <Select.Option value={4}>4</Select.Option>
            <Select.Option value={5}>5</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="teacher_id"
          label={<div style={{ width: 80, textAlign: 'left' }}>Giáo viên</div>}
        >
          <Select
            {...teacherSelectProps}
            placeholder="Chọn giáo viên"
            allowClear
            style={{ width: 250 }}
            mode="multiple"
            maxTagCount={MAX_TAGS_DISPLAY}
            maxTagPlaceholder={(omittedValues) => (
              <Tooltip title={omittedValues.map((val) => val.label).join(', ')}>
                +{omittedValues.length}
              </Tooltip>
            )}
          />
        </Form.Item>

        <Form.Item
          name="class_id"
          label={<div style={{ width: 80, textAlign: 'left' }}>Lớp học</div>}
        >
          <Select
            {...classSelectProps}
            placeholder="Chọn lớp học"
            allowClear
            style={{ width: 250 }}
            mode="multiple"
            maxTagCount={MAX_TAGS_DISPLAY}
            maxTagPlaceholder={(omittedValues) => (
              <Tooltip title={omittedValues.map((val) => val.label).join(', ')}>
                +{omittedValues.length}
              </Tooltip>
            )}
          />
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
        dataSource={tableProps.dataSource}
        tableLayout="fixed"
        loading={false}
        scroll={{ x: 'max-content' }}
        pagination={{
          ...tableProps.pagination,
          position: ['bottomCenter'],
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total) => `Tổng cộng ${total} môn học`,
        }}
      >
        <Table.Column
          dataIndex="id"
          title="Mã"
          width={60}
          ellipsis
          render={(value: string) => (
            <Tooltip placement="topLeft" title={value}>
              <div style={{ width: 80, wordWrap: 'break-word' }}>
                {truncateText(value)}
              </div>
            </Tooltip>
          )}
        />
        <Table.Column dataIndex="subject_code" title="Mã môn học" />
        <Table.Column dataIndex="subject_name" title="Tên môn học" />
        <Table.Column dataIndex="credits" title="Số tín chỉ" />
        <Table.Column
          title="Lớp học"
          dataIndex="teacherSubjectClasses"
          width={200}
          render={(tsc: TeacherSubjectClass[]) => (
            <div style={{ maxHeight: 80, overflowY: 'auto', paddingRight: 4 }}>
              {tsc?.map((cls) => (
                <div key={cls.id} style={{ marginBottom: 4 }}>
                  <Tooltip title={cls.class?.class_code}>
                    <strong>{cls.class?.class_code}</strong>
                  </Tooltip>
                  {' - '}
                  <Tooltip title={cls.class?.class_name}>
                    <span>{truncateText(cls.class?.class_name, 20)}</span>
                  </Tooltip>
                </div>
              ))}
            </div>
          )}
        />
        <Table.Column
          title="Giáo viên"
          dataIndex="teacherSubjectClasses"
          width={220}
          render={(tsc: TeacherSubjectClass[]) => (
            <div style={{ maxHeight: 80, overflowY: 'auto', paddingRight: 4 }}>
              {tsc?.map((cls) => (
                <div key={cls.id} style={{ marginBottom: 4 }}>
                  <Tooltip title={cls.teacher?.teacher_code}>
                    <strong>{cls.teacher?.teacher_code}</strong>
                  </Tooltip>
                  {' - '}
                  <Tooltip title={cls.teacher?.full_name}>
                    <span>{truncateText(cls.teacher?.full_name, 25)}</span>
                  </Tooltip>
                </div>
              ))}
            </div>
          )}
        />
        <Table.Column
          title="Sinh viên"
          dataIndex="studentGrades"
          width={280}
          render={(grades: StudentGrade[]) => (
            <div style={{ maxHeight: 80, overflowY: 'auto', paddingRight: 4 }}>
              {grades?.map((grade) => (
                <div key={grade.id} style={{ marginBottom: 4 }}>
                  <Tooltip title={grade.student?.student_code}>
                    <strong>{grade.student?.student_code}</strong>
                  </Tooltip>
                  {' - '}
                  <Tooltip title={grade.student?.full_name}>
                    <span>{truncateText(grade.student?.full_name, 25)}</span>
                  </Tooltip>{' '}
                  ({grade.score})
                </div>
              ))}
            </div>
          )}
        />
        <Table.Column
          dataIndex="created_at"
          title="Ngày tạo"
          render={(value: string) => <DateField value={value} />}
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
