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
import { Button, Form, Input, Select, Space, Table, Tag, Tooltip } from 'antd';
import { GENDER, TAG_GENDER_COLOR_MAPPING, TAG_GENDER_MAPPING } from '@common';
import { truncateText } from '@common/helper';
import { Teacher, TeacherSubjectClass } from '@interfaces/response';
import { TeacherTableFilter } from '@interfaces';

const TeachersManagement = () => {
  const { tableProps, searchFormProps } = useTable<
    Teacher,
    HttpError,
    TeacherTableFilter
  >({
    syncWithLocation: true,
    resource: 'api/v1/teachers',
    onSearch: (values) => {
      const filters: CrudFilters = [];

      if (values.full_name != null) {
        filters.push({
          field: 'full_name',
          operator: 'contains',
          value: values.full_name,
        });
      }

      if (values.teacher_code != null) {
        filters.push({
          field: 'teacher_code',
          operator: 'contains',
          value: values.teacher_code || undefined,
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
      title="Quản lý giáo viên"
      createButtonProps={{
        children: 'Thêm giáo viên',
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
          name="teacher_code"
          label={
            <div style={{ width: 80, textAlign: 'left' }}>Mã giáo viên</div>
          }
        >
          <Input
            placeholder="Tìm theo mã giáo viên..."
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
        pagination={{
          ...tableProps.pagination,
          position: ['bottomCenter'],
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total) => `Tổng cộng ${total} giáo viên`,
        }}
      >
        <Table.Column
          dataIndex="id"
          title="Mã"
          width={60}
          ellipsis
          render={(value: string) => (
            <Tooltip placement="topLeft" title={value}>
              <div style={{ width: 60, wordWrap: 'break-word' }}>
                {truncateText(value)}
              </div>
            </Tooltip>
          )}
        />
        <Table.Column
          dataIndex="teacher_code"
          title="Mã giáo viên"
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
          dataIndex="teacherSubjectClasses"
          title="Môn học - Lớp học"
          render={(items: TeacherSubjectClass[]) => {
            const tooltipContent = (
              <div>
                {items?.map((item, idx) => (
                  <div key={idx}>
                    <b>{item.subject.subject_name}</b> - {item.class.class_name}
                  </div>
                )) || '-'}
              </div>
            );

            const displayContent = items
              ?.map(
                (item) =>
                  `${item.subject.subject_name} - ${item.class.class_name}`
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
                resource="api/v1/teachers"
                confirmTitle="Bạn có chắc muốn xóa giáo viên này không?"
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

export default TeachersManagement;
