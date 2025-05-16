import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useForm,
  useTable,
} from '@refinedev/antd';
import { CrudFilters, HttpError, type BaseRecord } from '@refinedev/core';
import { Button, Form, Input, Select, Space, Table, Tag, Tooltip } from 'antd';
import React from 'react';
import { truncateText } from '@common/helper';
import { Student } from '@interfaces/response';
import { StudentTableFilter } from '@interfaces';
import { GENDER, TAG_GENDER_COLOR_MAPPING, TAG_GENDER_MAPPING } from '@common';

const StudentsManagement = () => {
  const { tableProps, searchFormProps } = useTable<
    Student,
    HttpError,
    StudentTableFilter
  >({
    syncWithLocation: true,
    resource: 'api/v1/students',
    onSearch: (values) => {
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

      filters.push({
        field: 'gender',
        operator: 'eq',
        value: values.gender ?? undefined,
      });

      return filters;
    },
  });

  return (
    <List
      title="Quản lý sinh viên"
      createButtonProps={{
        children: 'Thêm sinh viên',
      }}
    >
      <Form
        layout="inline"
        {...searchFormProps}
        style={{ marginBottom: 16, display: 'flex', gap: 8 }}
      >
        <Form.Item
          name="full_name"
          label={<div style={{ width: 80, textAlign: 'left' }}>Họ tên</div>}
        >
          <Input
            placeholder="Tìm theo tên..."
            allowClear
            style={{ width: 250 }}
          />
        </Form.Item>

        <Form.Item
          name="student_code"
          label={
            <div style={{ width: 80, textAlign: 'left' }}>Mã sinh viên</div>
          }
        >
          <Input
            placeholder="Tìm theo mã sinh viên..."
            allowClear
            style={{ width: 250 }}
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label={<div style={{ width: 80, textAlign: 'left' }}>Giới tính</div>}
        >
          <Select
            placeholder="Chọn giới tính"
            allowClear
            style={{ width: 250 }}
          >
            <Select.Option value="male">Nam</Select.Option>
            <Select.Option value="female">Nữ</Select.Option>
            <Select.Option value="other">Khác</Select.Option>
          </Select>
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
        dataSource={tableProps.dataSource}
        pagination={{
          ...tableProps.pagination,
          position: ['bottomCenter'],
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total) => `Tổng cộng ${total} bản ghi`,
        }}
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
        <Table.Column
          dataIndex="student_code"
          title="Mã sinh viên"
          width={120}
          sorter={{ multiple: 1 }}
        />
        <Table.Column
          dataIndex="full_name"
          title="Họ tên"
          sorter={{ multiple: 2 }}
          width={200}
        />
        <Table.Column
          dataIndex="gender"
          title="Giới tính"
          render={(value: GENDER) => (
            <Tag color={TAG_GENDER_COLOR_MAPPING[value]}>
              {TAG_GENDER_MAPPING[value]}
            </Tag>
          )}
          sorter
        />
        <Table.Column
          dataIndex="date_of_birth"
          title="Ngày sinh"
          sorter={{ multiple: 3 }}
          render={(value: string) => (
            <DateField value={value} format="DD/MM/YYYY" />
          )}
        />
        <Table.Column
          dataIndex="class"
          title="Lớp"
          render={(value) => value?.class_name}
        />
        <Table.Column
          dataIndex="created_at"
          title="Ngày tạo"
          sorter={{ multiple: 4 }}
          render={(value: string) => (
            <DateField value={value} format="DD/MM/YYYY" />
          )}
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
