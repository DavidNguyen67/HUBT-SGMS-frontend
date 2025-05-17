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
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';
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
import { MAX_TAGS_DISPLAY } from '@common';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import TeacherPicker from '@components/TeacherPicker';
import ClassPicker from '@components/ClassPicker';

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

      if (values.subject_code_and_name != null) {
        filters.push({
          field: 'subject_code_and_name',
          operator: 'contains',
          value: values.subject_code_and_name || undefined,
        });
      }

      if (values.teacher_id != null) {
        filters.push({
          field: 'teacher_id',
          operator: 'contains',
          value: values.teacher_id || undefined,
        });
      }

      if (values.class_id != null) {
        filters.push({
          field: 'class_id',
          operator: 'contains',
          value: values.class_id || undefined,
        });
      }

      filters.push({
        field: 'credits',
        operator: 'contains',
        value: values.credits || undefined,
      });

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

  return (
    <List
      title="Quản lý môn học"
      createButtonProps={{
        children: 'Thêm môn học',
      }}
    >
      <Form layout="vertical" {...searchFormProps}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="subject_code_and_name" label="Môn học">
              <Input placeholder="Tìm theo mã hoặc tên môn..." allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="credits" label="Số tín chỉ">
              <Select placeholder="Chọn số tín chỉ" allowClear>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={3}>3</Select.Option>
                <Select.Option value={4}>4</Select.Option>
                <Select.Option value={5}>5</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="teacher_id" label="Giáo viên">
              <TeacherPicker />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="class_id" label="Lớp học">
              <ClassPicker />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            style={{ textAlign: 'right' }}
          >
            <Form.Item>
              <Space>
                <Button
                  htmlType="submit"
                  type="primary"
                  icon={<SearchOutlined />}
                  style={{ minWidth: 90 }}
                >
                  Lọc
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    searchFormProps.form?.resetFields();
                    searchFormProps.form?.submit();
                  }}
                  style={{ minWidth: 90 }}
                >
                  Đặt lại
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
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
        }}
      >
        <Table.Column<Subject>
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
        <Table.Column<Subject>
          dataIndex="subject_code"
          title="Mã môn học"
          sorter={{ multiple: 1 }}
          filters={
            Array.from(
              new Set(tableProps.dataSource?.map((item) => item.subject_code))
            ).map((code) => ({ text: code, value: code })) ?? []
          }
          onFilter={(value, record) => record.subject_code === value}
          width={150}
        />
        <Table.Column<Subject>
          dataIndex="subject_name"
          title="Tên môn học"
          sorter={{ multiple: 2 }}
          filters={
            Array.from(
              new Set(tableProps.dataSource?.map((item) => item.subject_name))
            ).map((name) => ({ text: name, value: name })) ?? []
          }
          onFilter={(value, record) => record.subject_name === value}
          width={150}
        />
        <Table.Column<Subject>
          dataIndex="credits"
          title="Số tín chỉ"
          width={180}
          sorter={{ multiple: 3 }}
          filters={
            Array.from(
              new Set(tableProps.dataSource?.map((item) => item.credits))
            ).map((credit) => ({ text: credit, value: credit })) ?? []
          }
          onFilter={(value, record) => record.credits === value}
        />
        <Table.Column<Subject>
          title="Lớp học"
          dataIndex="teacherSubjectClasses"
          width={200}
          filters={
            Array.from(
              new Set(
                tableProps.dataSource
                  ?.flatMap((s) =>
                    s.teacherSubjectClasses?.map((cls) => cls.class?.class_name)
                  )
                  .filter(Boolean)
              )
            ).map((name) => ({
              text: name,
              value: name,
            })) ?? []
          }
          onFilter={(value, record) =>
            record.teacherSubjectClasses?.some(
              (cls) => cls.class?.class_name === value
            ) ||
            record.teacherSubjectClasses?.some(
              (cls) => cls.teacher?.full_name === value
            )
          }
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
        <Table.Column<Subject>
          title="Giáo viên"
          dataIndex="teacherSubjectClasses"
          width={220}
          filters={
            Array.from(
              new Set(
                tableProps.dataSource
                  ?.flatMap((s) =>
                    s.teacherSubjectClasses?.map(
                      (cls) => cls.teacher?.full_name
                    )
                  )
                  .filter(Boolean)
              )
            ).map((name) => ({
              text: name,
              value: name,
            })) ?? []
          }
          onFilter={(value, record) =>
            record.teacherSubjectClasses?.some(
              (cls) => cls.class?.class_name === value
            ) ||
            record.teacherSubjectClasses?.some(
              (cls) => cls.teacher?.full_name === value
            )
          }
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
        <Table.Column<Subject>
          title="Sinh viên"
          dataIndex="studentGrades"
          width={280}
          filters={
            Array.from(
              new Set(
                tableProps.dataSource
                  ?.flatMap((s) =>
                    s.studentGrades?.map((grade) => grade.student?.full_name)
                  )
                  .filter(Boolean)
              )
            ).map((name) => ({
              text: name,
              value: name,
            })) ?? []
          }
          onFilter={(value, record) =>
            record.studentGrades?.some(
              (grade) => grade.student?.full_name === value
            )
          }
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
          width={100}
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
