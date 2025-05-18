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
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import React from 'react';
import { truncateText } from '@common/helper';
import { Student } from '@interfaces/response';
import { StudentTableFilter } from '@interfaces';
import {
  DEFAULT_DATE_FORMAT,
  GENDER,
  TAG_GENDER_COLOR_MAPPING,
  TAG_GENDER_MAPPING,
} from '@common';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import ClassPicker from '@elements/ClassPicker';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const StudentsManagement = () => {
  const onSearch = (values: StudentTableFilter) => {
    const filters: CrudFilters = [];

    if (values.full_name != null) {
      filters.push({
        field: 'full_name',
        operator: 'contains',
        value: values.full_name || undefined,
      });
    }

    if (values.student_code != null) {
      filters.push({
        field: 'student_code',
        operator: 'contains',
        value: values.student_code || undefined,
      });
    }

    if (values.class_ids != null) {
      filters.push({
        field: 'class_ids',
        operator: 'contains',
        value: values.class_ids || undefined,
      });
    }

    if (values.date_of_birth_range && values.date_of_birth_range.length > 0) {
      const [from, to] = values.date_of_birth_range;

      if (from) {
        filters.push({
          field: 'date_of_birth_from',
          operator: 'gte',
          value: from.add(1, 'day').toISOString(),
        });
      }
      if (to) {
        filters.push({
          field: 'date_of_birth_to',
          operator: 'lte',
          value: to.add(2, 'day').toISOString(),
        });
      }
    } else {
      filters.push({
        field: 'date_of_birth_from',
        operator: 'gte',
        value: undefined,
      });
      filters.push({
        field: 'date_of_birth_to',
        operator: 'lte',
        value: undefined,
      });
    }

    filters.push({
      field: 'gender',
      operator: 'eq',
      value: values.gender ?? undefined,
    });

    return filters;
  };

  const { tableProps, searchFormProps } = useTable<
    Student,
    HttpError,
    StudentTableFilter
  >({
    syncWithLocation: true,
    resource: 'api/v1/students',
    onSearch,
  });

  return (
    <List
      title="Quản lý sinh viên"
      createButtonProps={{
        children: 'Thêm sinh viên',
      }}
    >
      <Form layout="vertical" {...searchFormProps}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="full_name" label="Họ tên">
              <Input placeholder="Tìm theo tên..." allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="student_code" label="Mã sinh viên">
              <Input placeholder="Tìm theo mã sinh viên..." allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="date_of_birth_range" label="Ngày sinh">
              <DatePicker.RangePicker
                format={DEFAULT_DATE_FORMAT}
                allowClear
                style={{ width: '100%' }}
                placeholder={['Từ ngày', 'Đến ngày']}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="class_ids" label="Lớp học">
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
        tableLayout="fixed"
        dataSource={tableProps.dataSource}
        pagination={{
          ...tableProps.pagination,
          position: ['bottomCenter'],
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
        }}
        size="small"
      >
        <Table.Column<Student>
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
        <Table.Column<Student>
          dataIndex="student_code"
          title="Mã sinh viên"
          width={150}
          sorter={{ multiple: 1 }}
          filters={
            Array.from(
              new Set(tableProps.dataSource?.map((item) => item.student_code))
            ).map((code) => ({ text: code, value: code })) ?? []
          }
          onFilter={(value, record) => record.student_code === value}
        />
        <Table.Column<Student>
          dataIndex="full_name"
          title="Họ tên"
          sorter={{ multiple: 2 }}
          width={200}
          filters={
            Array.from(
              new Set(tableProps.dataSource?.map((item) => item.full_name))
            ).map((name) => ({ text: name, value: name })) ?? []
          }
          onFilter={(value, record) => record.full_name === value}
        />
        <Table.Column<Student>
          dataIndex="gender"
          title="Giới tính"
          render={(value: GENDER) => (
            <Tag color={TAG_GENDER_COLOR_MAPPING[value]}>
              {TAG_GENDER_MAPPING[value]}
            </Tag>
          )}
          sorter={{ multiple: 3 }}
          filters={[
            { text: 'Nam', value: 'male' },
            { text: 'Nữ', value: 'female' },
            { text: 'Khác', value: 'other' },
          ]}
          onFilter={(value, record) => record.gender === value}
        />
        <Table.Column<Student>
          dataIndex="date_of_birth"
          title="Ngày sinh"
          sorter={{ multiple: 3 }}
          render={(value: string) => (
            <DateField value={value} format={DEFAULT_DATE_FORMAT} />
          )}
          filters={
            Array.from(
              new Set(tableProps.dataSource?.map((item) => item.date_of_birth))
            ).map((date) => ({
              text: dayjs(date).format(DEFAULT_DATE_FORMAT),
              value: date,
            })) ?? []
          }
          onFilter={(value, record) =>
            dayjs(record.date_of_birth).isSameOrBefore(dayjs(value as string))
          }
        />
        <Table.Column<Student>
          dataIndex="class"
          title="Lớp"
          render={(value) => value?.class_name}
          filters={
            Array.from(
              new Set(
                tableProps.dataSource?.map((item) => item.class?.class_name)
              )
            )
              .filter(Boolean)
              .map((name) => ({ text: name, value: name })) ?? []
          }
          onFilter={(value, record) => record.class?.class_name === value}
        />
        <Table.Column<Student>
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
                resource="api/v1/students"
                confirmTitle="Bạn có chắc muốn xóa sinh viên này không?"
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

export default StudentsManagement;
