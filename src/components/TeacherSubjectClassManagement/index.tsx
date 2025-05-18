import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { CrudFilters, HttpError, type BaseRecord } from '@refinedev/core';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import React from 'react';
import { DEFAULT_DATE_FORMAT } from '@common';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import TeacherPicker from '@elements/TeacherPicker';
import SubjectPicker from '@elements/SubjectPicker';
import ClassPicker from '@elements/ClassPicker';
import { TeacherSubjectClass } from '@interfaces/response';
import { TeacherSubjectClassTableFilter } from '@interfaces';
import { truncateText } from '@common/helper';

const TeacherSubjectClassManagement = () => {
  const onSearch = (values: TeacherSubjectClassTableFilter) => {
    const filters: CrudFilters = [];

    if (values.teacher_ids != null) {
      filters.push({
        field: 'teacher_ids',
        operator: 'in',
        value: values.teacher_ids,
      });
    }

    if (values.subject_ids != null) {
      filters.push({
        field: 'subject_ids',
        operator: 'in',
        value: values.subject_ids,
      });
    }

    if (values.class_ids != null) {
      filters.push({
        field: 'class_ids',
        operator: 'in',
        value: values.class_ids,
      });
    }

    if (values.create_at_range && values.create_at_range.length > 0) {
      const [from, to] = values.create_at_range;

      if (from) {
        filters.push({
          field: 'create_at_range_from',
          operator: 'gte',
          value: from.add(1, 'day').toISOString(),
        });
      }
      if (to) {
        filters.push({
          field: 'create_at_range_to',
          operator: 'lte',
          value: to.add(2, 'day').toISOString(),
        });
      }
    } else {
      filters.push({
        field: 'create_at_range_from',
        operator: 'gte',
        value: undefined,
      });
      filters.push({
        field: 'create_at_range_to',
        operator: 'lte',
        value: undefined,
      });
    }

    return filters;
  };

  const { tableProps, searchFormProps } = useTable<
    TeacherSubjectClass,
    HttpError,
    TeacherSubjectClassTableFilter
  >({
    syncWithLocation: true,
    resource: 'api/v1/teacher-subject-classes',
    onSearch,
  });

  return (
    <List
      title="Quản lýp hân công giảng dạy"
      createButtonProps={{
        children: 'Đăng ký phân công',
      }}
    >
      <Form layout="vertical" {...searchFormProps}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="teacher_ids" label="Tên giáo viên">
              <TeacherPicker />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="subject_ids" label="Tên môn học">
              <SubjectPicker />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="class_ids" label="Tên lớp">
              <ClassPicker />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="create_at_range" label="Ngày đăng ký">
              <DatePicker.RangePicker
                format={DEFAULT_DATE_FORMAT}
                allowClear
                style={{ width: '100%' }}
                placeholder={['Từ ngày', 'Đến ngày']}
              />
            </Form.Item>
          </Col>
          <Col xs={24} style={{ textAlign: 'right' }}>
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
          pageSizeOptions: ['10', '20', '30'],
        }}
        size="small"
        scroll={{ x: 900 }}
      >
        <Table.Column<TeacherSubjectClass>
          dataIndex="id"
          title="Mã"
          width={100}
          render={(value: string) => (
            <Tooltip placement="topLeft" title={value}>
              <div
                style={{
                  width: 100,
                  wordWrap: 'break-word',
                  wordBreak: 'break-word',
                }}
              >
                {truncateText(value)}
              </div>
            </Tooltip>
          )}
        />
        <Table.Column<TeacherSubjectClass>
          title="Giáo viên"
          sorter={{ multiple: 2 }}
          dataIndex={['teacher', 'full_name']}
          render={(_, record) => (
            <Space>
              <Tag color="blue" style={{ marginLeft: 0 }}>
                {record.teacher?.teacher_code}
              </Tag>
              <span style={{ fontWeight: 500 }}>
                {record.teacher?.full_name}
              </span>
            </Space>
          )}
        />
        <Table.Column<TeacherSubjectClass>
          title="Môn học"
          sorter={{ multiple: 3 }}
          dataIndex={['subject', 'subject_name']}
          render={(_, record) => (
            <Space>
              <Tag color="purple" style={{ marginLeft: 0 }}>
                {record.subject?.subject_code}
              </Tag>
              <span style={{ fontWeight: 500 }}>
                {record.subject?.subject_name}
              </span>
            </Space>
          )}
        />
        <Table.Column<TeacherSubjectClass>
          title="Lớp học"
          sorter={{ multiple: 4 }}
          dataIndex={['class', 'class_name']}
          render={(_, record) => (
            <Space>
              <Tag color="geekblue" style={{ marginLeft: 0 }}>
                {record.class?.class_code}
              </Tag>
              <span style={{ fontWeight: 500 }}>
                {record.class?.class_name}
              </span>
            </Space>
          )}
        />
        <Table.Column<TeacherSubjectClass>
          title="Ngày phân công"
          sorter={{ multiple: 5 }}
          dataIndex="created_at"
          render={(value: string) => (
            <DateField value={value} format={DEFAULT_DATE_FORMAT} />
          )}
        />
        <Table.Column<TeacherSubjectClass>
          title="Thao tác"
          width={100}
          fixed="right"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                resource="api/v1/teacher-subject-classes"
                confirmTitle="Bạn có chắc muốn xóa bản ghi này không?"
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

export default TeacherSubjectClassManagement;
