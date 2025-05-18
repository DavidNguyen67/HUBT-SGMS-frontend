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
import { CrudFilters, HttpError, BaseRecord } from '@refinedev/core';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';
import React from 'react';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { DEFAULT_DATE_FORMAT, MAX_TAGS_DISPLAY } from '@common';
import { Student, StudentGrade, Subject } from '@interfaces/response';
import { StudentGradeTableFilter } from '@interfaces';
import SubjectPicker from '@elements/SubjectPicker';
import StudentPicker from '@elements/StudentPicker';

const StudentGradeManagement = () => {
  const onSearch = (values: StudentGradeTableFilter) => {
    const filters: CrudFilters = [];

    if (values.subject_ids != null) {
      filters.push({
        field: 'subject_ids',
        operator: 'contains',
        value: values.subject_ids,
      });
    }

    if (values.student_ids != null) {
      filters.push({
        field: 'student_ids',
        operator: 'contains',
        value: values.student_ids,
      });
    }

    filters.push({
      field: 'score',
      operator: 'eq',
      value: values.score,
    });

    if (values.created_at_range && values.created_at_range.length > 0) {
      const [from, to] = values.created_at_range;

      if (from) {
        filters.push({
          field: 'created_at_from',
          operator: 'gte',
          value: from.add(1, 'day').toISOString(),
        });
      }
      if (to) {
        filters.push({
          field: 'created_at_to',
          operator: 'lte',
          value: to.add(2, 'day').toISOString(),
        });
      }
    } else {
      filters.push({
        field: 'created_at_from',
        operator: 'gte',
        value: undefined,
      });
      filters.push({
        field: 'created_at_to',
        operator: 'lte',
        value: undefined,
      });
    }

    return filters;
  };

  const { tableProps, searchFormProps } = useTable<
    StudentGrade,
    HttpError,
    StudentGradeTableFilter
  >({
    syncWithLocation: true,
    resource: 'api/v1/student-grades',
    onSearch,
  });

  return (
    <List
      title="Quản lý điểm sinh viên"
      createButtonProps={{ children: 'Thêm điểm' }}
    >
      <Form layout="vertical" {...searchFormProps}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="student_ids" label="Sinh viên">
              <StudentPicker />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="subject_ids" label="Môn học">
              <SubjectPicker />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="score" label="Điểm">
              <InputNumber
                min={0}
                max={10}
                style={{ width: '100%' }}
                placeholder="Nhập điểm"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="created_at_range" label="Ngày chấm">
              <DatePicker.RangePicker
                format={DEFAULT_DATE_FORMAT}
                allowClear
                style={{ width: '100%' }}
                placeholder={['Từ ngày', 'Đến ngày']}
              />
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
        tableLayout="fixed"
        pagination={{
          ...tableProps.pagination,
          position: ['bottomCenter'],
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15'],
        }}
        size="small"
      >
        <Table.Column<StudentGrade>
          title="Tên sinh viên"
          dataIndex={['student', 'full_name']}
          render={(_, record) => record.student?.full_name}
          sorter={{ multiple: 1 }}
        />
        <Table.Column<StudentGrade>
          title="Mã sinh viên"
          dataIndex={['student', 'student_code']}
          render={(_, record) => record.student?.student_code}
          sorter={{ multiple: 2 }}
        />
        <Table.Column<StudentGrade>
          title="Môn học"
          dataIndex={['subject', 'subject_name']}
          render={(_, record) => record.subject?.subject_name}
          sorter={{ multiple: 3 }}
        />
        <Table.Column<StudentGrade>
          title="Loại điểm"
          dataIndex={['grade_type', 'grade_name']}
          render={(_, record) => record.grade_type?.grade_name}
          sorter={{ multiple: 4 }}
        />
        <Table.Column<StudentGrade>
          title="Hệ số"
          dataIndex={['grade_type', 'coefficient']}
          render={(_, record) => record.grade_type?.coefficient}
          sorter={{ multiple: 5 }}
        />
        <Table.Column<StudentGrade>
          title="Điểm"
          dataIndex="score"
          sorter={{ multiple: 6 }}
        />
        <Table.Column<StudentGrade>
          title="Ngày chấm"
          dataIndex="created_at"
          render={(value) => (
            <DateField value={value} format={DEFAULT_DATE_FORMAT} />
          )}
          sorter={{ multiple: 7 }}
        />
        <Table.Column<StudentGrade>
          title="Thao tác"
          fixed="right"
          width={120}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                resource="api/v1/student-grades"
                confirmTitle="Bạn có chắc muốn xóa điểm này không?"
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

export default StudentGradeManagement;
